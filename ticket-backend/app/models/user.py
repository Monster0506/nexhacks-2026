"""User model implementation."""

import uuid
from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    """Represents a user in the ticket management system."""

    id: str
    name: str

    def __init__(self, name: str, id: Optional[str] = None):
        """
        Initialize a new user.

        Args:
            name: The user's display name
            id: Optional user ID. If not provided, a UUID will be generated
        """
        self.id = id if id is not None else str(uuid.uuid4())
        self.name = name

    def to_dict(self) -> dict:
        """Convert user to dictionary representation."""
        return {
            "id": self.id,
            "name": self.name,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "User":
        """
        Create a User instance from a dictionary.

        Args:
            data: Dictionary containing user data

        Returns:
            User instance
        """
        return cls(
            id=data.get("id"),
            name=data["name"],
        )

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r})"

    def __eq__(self, other) -> bool:
        if not isinstance(other, User):
            return False
        return self.id == other.id
