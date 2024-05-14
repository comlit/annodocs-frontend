import './Annotator.css'
import {useRef} from "react";
import {Text} from "@chakra-ui/react";

function Annotator() {

    const markRef = useRef()

    /*
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [selectedText, setSelectedText] = useState<string>();
    const [start, setStart] = useState<number>();
    const [end, setEnd] = useState<number>();
    */

    const mouseUp = () => {
        const selection = document.getSelection();

        if (!selection || selection?.isCollapsed)
            return;

        const parent = document.getSelection()?.getRangeAt(0).commonAncestorContainer;
        let selectedNodes = [];

        let start = selection?.anchorOffset;
        let end = selection?.focusOffset;
        if (parent && selection?.anchorNode != selection?.focusNode) {
            if (selectionIsBackwards(selection)) {
                selectedNodes = [selection.focusNode, ...getTextNodesBetween(parent, selection.focusNode, selection.anchorNode), selection.anchorNode]
                start = selection.focusOffset;
                end = selection.anchorOffset;
            } else
                selectedNodes = [selection.anchorNode, ...getTextNodesBetween(parent, selection.anchorNode, selection.focusNode), selection.focusNode]
        } else
            selectedNodes = [selection?.anchorNode]

        if (selectedNodes.length == 1) {
            console.log("only one node selected");
            selection.getRangeAt(0).surroundContents(document.createElement('mark'));
        } else {
            console.log("multiple nodes selected");
            for (let i = 0; i < selectedNodes.length; i++) {
                if (i == 0) {
                    const range = document.createRange();
                    range.setStart(selectedNodes[i], start);
                    range.setEnd(selectedNodes[i], selectedNodes[i].textContent?.length ?? 0);
                    range.surroundContents(document.createElement('mark'));
                } else if (i == selectedNodes.length - 1) {
                    const range = document.createRange();
                    range.setStart(selectedNodes[i], 0);
                    range.setEnd(selectedNodes[i], end);
                    range.surroundContents(document.createElement('mark'));
                } else {
                    const range = document.createRange();
                    range.selectNode(selectedNodes[i]);
                    range.surroundContents(document.createElement('mark'));
                }
            }
        }
        document.getSelection()?.empty();
    }


    function getTextNodesBetween(rootNode: Node, startNode: Node, endNode: Node) {
        let pastStartNode = false, reachedEndNode = false
        const textNodes: Node[] = [];

        function getTextNodes(node: Node) {
            if (node == startNode) {
                pastStartNode = true;
            } else if (node == endNode) {
                reachedEndNode = true;
            } else if (node.nodeType == 3) {
                if (pastStartNode && !reachedEndNode && !/^\s*$/.test(node.nodeValue ?? "")) {
                    textNodes.push(node);
                }
            } else {
                for (let i = 0, len = node.childNodes.length; !reachedEndNode && i < len; ++i) {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }

        getTextNodes(rootNode);
        return textNodes;
    }

    const selectionIsBackwards = (selection: Selection) => {
        return selection.anchorNode.compareDocumentPosition(selection.focusNode) === Node.DOCUMENT_POSITION_PRECEDING
    }


    return (
        <>
            <Text className="jurAbsatz" style={{whiteSpace: "pre-wrap"}} onMouseUp={mouseUp}>
                {'(1) Die Sache ist frei von Sachmängeln, wenn sie bei Gefahrübergang den subjektiven Anforderungen, den objektiven Anforderungen und den Montageanforderungen dieser Vorschrift entspricht.\n(2) Die Sache entspricht den subjektiven Anforderungen, wenn sie\n    1.  die vereinbarte Beschaffenheit hat,\n    2.  sich für die nach dem Vertrag vorausgesetzte Verwendung eignet und\n3.\nmit dem vereinbarten Zubehör und den vereinbarten Anleitungen, einschließlich Montage- und Installationsanleitungen, übergeben wird.\nZu der Beschaffenheit nach Satz 1 Nummer 1 gehören Art, Menge, Qualität, Funktionalität, Kompatibilität, Interoperabilität und sonstige Merkmale der Sache, für die die Parteien Anforderungen vereinbart haben.\n(3) Soweit nicht wirksam etwas anderes vereinbart wurde, entspricht die Sache den objektiven Anforderungen, wenn sie\n1.\nsich für die gewöhnliche Verwendung eignet,\n2.\neine Beschaffenheit aufweist, die bei Sachen derselben Art üblich ist und die der Käufer erwarten kann unter Berücksichtigung\na)\nder Art der Sache und\nb)\nder öffentlichen Äußerungen, die von dem Verkäufer oder einem anderen Glied der Vertragskette oder in deren Auftrag, insbesondere in der Werbung oder auf dem Etikett, abgegeben wurden,\n3.\nder Beschaffenheit einer Probe oder eines Musters entspricht, die oder das der Verkäufer dem Käufer vor Vertragsschluss zur Verfügung gestellt hat, und\n4.\nmit dem Zubehör einschließlich der Verpackung, der Montage- oder Installationsanleitung sowie anderen Anleitungen übergeben wird, deren Erhalt der Käufer erwarten kann.\nZu der üblichen Beschaffenheit nach Satz 1 Nummer 2 gehören Menge, Qualität und sonstige Merkmale der Sache, einschließlich ihrer Haltbarkeit, Funktionalität, Kompatibilität und Sicherheit. Der Verkäufer ist durch die in Satz 1 Nummer 2 Buchstabe b genannten öffentlichen Äußerungen nicht gebunden, wenn er sie nicht kannte und auch nicht kennen konnte, wenn die Äußerung im Zeitpunkt des Vertragsschlusses in derselben oder in gleichwertiger Weise berichtigt war oder wenn die Äußerung die Kaufentscheidung nicht beeinflussen konnte.\n(4) Soweit eine Montage durchzuführen ist, entspricht die Sache den Montageanforderungen, wenn die Montage\n1.\nsachgemäß durchgeführt worden ist oder\n2.\nzwar unsachgemäß durchgeführt worden ist, dies jedoch weder auf einer unsachgemäßen Montage durch den Verkäufer noch auf einem Mangel in der vom Verkäufer übergebenen Anleitung beruht.\n(5) Einem Sachmangel steht es gleich, wenn der Verkäufer eine andere Sache als die vertraglich geschuldete Sache liefert.'}
            </Text>

        </>
    );
}

export default Annotator;