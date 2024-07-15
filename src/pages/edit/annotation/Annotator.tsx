import './Annotator.css'
import SingleStringAnnotator from "./SingleStringAnnotator.tsx";
import {ReactElement, useContext} from "react";
import eventEmitter from "../EventEmitter.ts";
import AnnotationContext from "../AnnotationContext.ts";
import {Box, Heading} from "@chakra-ui/react";
import Toolbar from "../Toolbar.tsx";

type textpart = {
    id: number,
    text: string,
}

type list = {
    list: listitem[]
}

type listitem = {
    title: string,
    content: (list | textpart | listitem)[] | list | textpart | listitem
}

function Annotator({textList}: { textList: (list | textpart | listitem)[] }) {

    const {editMode, paragraph} = useContext(AnnotationContext);

    const emitMouseUp = () => {
        if (!editMode)
            return

        const selection = document.getSelection();
        if (!selection || selection.isCollapsed)
            return
        //deep copy the selection object
        const selectionCopy = copySelection(selection)
        eventEmitter.emit('annotatormouseup', selectionCopy);
        //clear the selection
        document.getSelection()?.empty()
    }

    function copySelection(selection: Selection) {
        const range = selection.getRangeAt(0).cloneRange();
        const newSelection = window.getSelection();
        newSelection?.removeAllRanges();
        newSelection?.addRange(range);
        return newSelection;
    }

    //TODO: check types. I mean it works but idk this can't be right
    const renderParagraph = (content: (list | textpart | listitem | (list | textpart | listitem)[])[] | list | textpart | listitem): ReactElement => {
        //content is text
        if ((content as textpart)?.text) {
            //setAnnotationIDs(prevState => [...prevState, (content as textpart).id.toString()])
            return <SingleStringAnnotator
                id={(content as textpart).id.toString()}
                text={(content as textpart).text}/>
        }


        //content is listitem
        if ((content as listitem)?.title)
            return <>
                <dt>{(content as listitem).title}</dt>
                <dd>{renderParagraph((content as listitem).content)}</dd>
            </>

        //content is list
        if ((content as list)?.list)
            return <>
                <dl>
                    {(content as list).list.map((item) => renderParagraph(item))}
                </dl>
            </>

        //content is []
        return <>
            {(content as (list | textpart | listitem | (list | textpart | listitem)[])[]).map(item => renderParagraph(item))}
        </>
    }

    return (
        <Box className="jnhtml"
             onMouseUp={emitMouseUp}
             border='1px'
             borderColor='gray.200'
             borderRadius='8px'
             px='10px'
             pos="relative"
        >
            <Heading size="md" w='100%' textAlign='center' mb='30px' mt='10px'>{`${paragraph.number} ${paragraph.title}`}</Heading>
            {editMode ? <Toolbar/> : null}
            {textList.map((item, index) =>
                <div className='jurAbsatz' key={index}>
                    {renderParagraph(item)}
                </div>
            )}
        </Box>
    );
}

export default Annotator;