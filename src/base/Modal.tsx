import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export const Modal = ({
  button,
  children,
  title,
  desc,
}: {
  button: React.ReactNode;
  children: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{button}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        <Dialog.Description className="sr-only">{desc}</Dialog.Description>
        {children}
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
