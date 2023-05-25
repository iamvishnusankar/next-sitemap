"use client";
import { FC, ReactNode, useRef, useState } from "react";
import clsx from "clsx";

interface CodeCopyButtonProps {
  children: ReactNode;
}

const CodeCopyButton: FC<CodeCopyButtonProps> = ({ children }) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);
    if (textInput.current !== null && textInput.current.textContent !== null)
      navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <>
      <div
        ref={textInput}
        onClick={onCopy}
        className={clsx("rounded border-2 bg-black p-1 dark:bg-gray-800", {
          "border border-green-500 text-green-500 hover:dark:bg-black rounded-lg p-2 hover:cursor-pointer":
            copied,
          "border border-gray-950 dark:border-neutral-300 hover:dark:bg-black bg-inherit rounded-lg p-2 hover:cursor-pointer":
            !copied,
        })}
      >
        <code lang="bash">{children}</code>
      </div>
    </>
  );
};

export default CodeCopyButton;
