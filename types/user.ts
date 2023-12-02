export interface UserDetails {
    id: string;
    email?: string
    first_name?: string;
    last_name?: string;
    full_name?: string;
    avatar_url?: string;
  }

export interface Todo {
    id: string;
    user_id: string
    tast: Text;
    is_completed:boolean
    inserted_at: Date
}