"""Proxy endpoints for handling external resources."""

import httpx
from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import StreamingResponse

router = APIRouter(prefix="/api/proxy", tags=["proxy"])


@router.get("/image")
async def proxy_image(url: str):
    """
    Proxy an external image to bypass CORS and mixed content restrictions.
    """
    if not url:
        raise HTTPException(status_code=400, detail="URL parameter is required")

    if not (url.startswith("http://") or url.startswith("https://")):
        raise HTTPException(status_code=400, detail="Invalid URL protocol")

    try:
        async with httpx.AsyncClient(follow_redirects=True) as client:
          
            req = client.build_request("GET", url, timeout=10.0)
            r = await client.send(req, stream=True)
            
            if r.status_code != 200:
                raise HTTPException(status_code=r.status_code, detail="Failed to fetch upstream image")

            return StreamingResponse(
                r.aiter_bytes(),
                media_type=r.headers.get("content-type", "application/octet-stream"),
                headers={
                    "Cache-Control": "public, max-age=3600",
                    "Access-Control-Allow-Origin": "*",
                }
            )

    except httpx.RequestError as e:
        print(f"Proxy error for URL {url}: {e}")
        raise HTTPException(status_code=502, detail="Error fetching external resource")
    except Exception as e:
        print(f"Unexpected proxy error: {e}")
        raise HTTPException(status_code=500, detail="Internal proxy error")
