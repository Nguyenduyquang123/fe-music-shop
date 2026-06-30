import { sendRequest } from "@/public/src/library/api";

export interface UpdateProfilePayload {
  full_name: string;
  phone: string;
  email: string;
  avatar?: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  password:string;
  password_confirmation:string;


}


export const userService = {
  getProfile() {
    return sendRequest({
      url: "/api/auth/admin/me",
      method: "GET",
    });
  },

  updateProfile(data: FormData | UpdateProfilePayload) {
    return sendRequest({
      url: "/api/auth/admin/profile",
      method: "PUT",
      body: data,
    });
  },

  changePassword(data: ChangePasswordPayload) {
    return sendRequest({
      url: "/api/auth/admin/change-password",
      method: "PUT",
      body: data,
    });
  },

  uploadAvatar(formData: FormData) {
    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/avatar`,
      {
        method: "POST",
        body: formData,
      }
    );
  },
    getUsers() {
    return sendRequest({
      url: "/api/auth/users",
      method: "GET",
    });
  },

  getUser(id: number) {
    return sendRequest({
      url: `/api/auth/users/${id}`,
      method: "GET",
    });
  },

  createUser(data: any) {
    return sendRequest({
      url: "/api/auth/users",
      method: "POST",
      body: data,
    });
  },

  updateUser(id: number, data: any) {
    return sendRequest({
      url: `/api/auth/users/${id}`,
      method: "PUT",
      body: data,
    });
  },

  deleteUser(id: number) {
    return sendRequest({
      url: `/api/auth/users/${id}`,
      method: "DELETE",
    });
  },
};