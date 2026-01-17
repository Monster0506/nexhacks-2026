import { writable, type Writable } from "svelte/store";

export interface User {
  id: string;
  name: string;
}

// Static list of users
export const users: User[] = [
  { id: "user-0", name: "Admin User" },
  { id: "user-1", name: "Austin Sternberg" },
  { id: "user-2", name: "Andrew Roddy" },
  { id: "user-3", name: "TJ Raklovits" },
  { id: "user-4", name: "Mason Bair" },
  { id: "user-5", name: "Noah Struck" },
];

// Current user store
export const currentUser: Writable<User | null> = writable(null);

// Helper to get user initials
export function getUserInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Set current user
export function setCurrentUser(user: User) {
  currentUser.set(user);
}

// Get user by ID
export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

// Initialize with the first user
setCurrentUser(users[1]);
