import { GridLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-primary-100">
      <GridLoader color="#6ca0dc" />
    </div>
  );
}
