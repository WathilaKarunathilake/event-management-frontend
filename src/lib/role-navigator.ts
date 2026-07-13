export const navigateByRole = (
  navigate: (path: string) => void,
  role: string,
): void => {
  switch (role) {
    case "ADMIN":
      navigate("/admin/dashboard");
      break;
    case "PUBLICUSER":
      navigate("/user/home");
      break;
    default:
      navigate("/unauthorized");
      break;
  }
};
