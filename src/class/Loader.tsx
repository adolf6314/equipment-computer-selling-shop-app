export const LoaderCircle = ({
  height,
  color,
}: {
  height: string;
  color: string;
}) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: height }}
    >
      <div
        className="animate-spin rounded-full h-32 w-32 border-y-[0.23rem]"
        style={{ borderColor: color }}
      ></div>
    </div>
  );
};
