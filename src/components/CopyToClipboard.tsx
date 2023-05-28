import { ToastProps } from "@chakra-ui/react";

export const handleCopy = (toast: (_: ToastProps) => {}, value: string) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copy URL to clipboard.",
        description: value,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    });
  } else {
    toast({
      title: "Cannot copy to clipboard :(",
      description: "navigator.clipboard is not found",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  }
};
