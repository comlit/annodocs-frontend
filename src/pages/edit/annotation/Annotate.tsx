import {ReactNode} from "react";

function Annotate({ children }: { children: ReactNode}) {
    const mouseUp = () => {
        const selection = document.getSelection();
        if (!selection || selection?.isCollapsed)
            return;
        console.log(selection);
    }
  return (
    <div onMouseUp={mouseUp}>
        {children}
    </div>
  );
}

export default Annotate;