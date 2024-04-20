export const ButtonCLR = ({ color }: { color: "Success" | "Danger" }) => {
  const Colors = {
    Success: "border-green-800 text-green-500 hover:bg-green-800",
    Danger: "border-red-800 text-red-500 hover:bg-red-800",
  };

  return `text-center border ${Colors[color]} hover:text-white`;
};
