export default interface AuthenticatedUserDto {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  token: string;
}
