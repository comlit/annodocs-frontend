import {Divider, IconButton, VStack} from "@chakra-ui/react";
import {useContext} from "react";
import AnnotationContext from "./AnnotationContext.ts";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {BiEraser} from "react-icons/bi";
import eventEmitter from "./EventEmitter.ts";

function Toolbar() {

  const {deleteMode, toggleDeleteMode} = useContext(AnnotationContext)

  return (
    <VStack pos="absolute" top="10px" right="10px" border='1px' borderColor='gray.200' borderRadius='8px' padding="4px">
        <IconButton aria-label={"Add"} icon={<EditIcon/>} variant={deleteMode ? "outline" : "solid"} onClick={() => toggleDeleteMode()}/>
        <IconButton aria-label={"Remove"} icon={<BiEraser scale="150%"/>} variant={deleteMode ? "solid" : "outline"} onClick={() => toggleDeleteMode()}/>
        <Divider/>
        <IconButton aria-label={"Delete"} icon={<DeleteIcon/>} variant={"outline"} onClick={() => {eventEmitter.emit("deleteAnnotations")}}/>
    </VStack>
  );
}

export default Toolbar;