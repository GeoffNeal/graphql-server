import { useRouteError } from "react-router-dom";

export default function ErrorRoute() {
  const error = useRouteError();
  console.error(error);

  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else {
    message = "Unknown error";
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}
