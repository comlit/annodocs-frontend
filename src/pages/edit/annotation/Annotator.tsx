import './Annotator.css'
import {useRef} from "react";
import SingleStringAnnotator from "./SingleStringAnnotator.tsx";

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
            <div className="jnhtml">
                <div>
                    <SingleStringAnnotator/>
                    <div className="jurAbsatz">(2) Die Sache entspricht den subjektiven Anforderungen, wenn sie <dl>
                        <dt>1.</dt>
                        <dd>
                            <div>die vereinbarte Beschaffenheit hat,</div>
                        </dd>
                        <dt>2.</dt>
                        <dd>
                            <div>sich für die nach dem Vertrag vorausgesetzte Verwendung eignet und</div>
                        </dd>
                        <dt>3.</dt>
                        <dd>
                            <div>
                                mit dem vereinbarten Zubehör und den vereinbarten Anleitungen, einschließlich Montage-
                                und Installationsanleitungen, übergeben wird.
                            </div>
                        </dd>
                    </dl>
                        Zu der Beschaffenheit nach Satz 1 Nummer 1 gehören Art, Menge, Qualität, Funktionalität,
                        Kompatibilität, Interoperabilität und sonstige Merkmale der Sache, für die die Parteien
                        Anforderungen vereinbart haben.
                    </div>
                    <div className="jurAbsatz">
                        (3) Soweit nicht wirksam etwas anderes vereinbart wurde, entspricht die
                        Sache den objektiven Anforderungen, wenn sie <dl>
                        <dt>1.</dt>
                        <dd>
                            <div>sich für die gewöhnliche Verwendung eignet,</div>
                        </dd>
                        <dt>2.</dt>
                        <dd>
                            <div>eine Beschaffenheit aufweist, die bei Sachen derselben Art üblich ist und die der
                                Käufer erwarten kann unter Berücksichtigung <dl>
                                    <dt>a)</dt>
                                    <dd>
                                        <div>der Art der Sache und</div>
                                    </dd>
                                    <dt>b)</dt>
                                    <dd>
                                        <div>der öffentlichen Äußerungen, die von dem Verkäufer oder einem anderen
                                            Glied der Vertragskette oder in deren Auftrag, insbesondere in der
                                            Werbung oder auf dem Etikett, abgegeben wurden,
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </dd>
                        <dt>3.</dt>
                        <dd>
                            <div>der Beschaffenheit einer Probe oder eines Musters entspricht, die oder das der
                                Verkäufer dem Käufer vor Vertragsschluss zur Verfügung gestellt hat, und
                            </div>
                        </dd>
                        <dt>4.</dt>
                        <dd>
                            <div>mit dem Zubehör einschließlich der Verpackung, der Montage- oder
                                Installationsanleitung sowie anderen Anleitungen übergeben wird, deren Erhalt der
                                Käufer erwarten kann.
                            </div>
                        </dd>
                    </dl>Zu der üblichen Beschaffenheit nach Satz 1 Nummer 2 gehören Menge, Qualität und sonstige
                        Merkmale der Sache, einschließlich ihrer Haltbarkeit, Funktionalität, Kompatibilität und
                        Sicherheit. Der Verkäufer ist durch die in Satz 1 Nummer 2 Buchstabe b genannten öffentlichen
                        Äußerungen nicht gebunden, wenn er sie nicht kannte und auch nicht kennen konnte, wenn die
                        Äußerung im Zeitpunkt des Vertragsschlusses in derselben oder in gleichwertiger Weise berichtigt
                        war oder wenn die Äußerung die Kaufentscheidung nicht beeinflussen konnte.
                    </div>
                    <div className="jurAbsatz">(4) Soweit eine Montage durchzuführen ist, entspricht die Sache den
                        Montageanforderungen, wenn die Montage <dl>
                            <dt>1.</dt>
                            <dd>
                                <div>sachgemäß durchgeführt worden ist oder</div>
                            </dd>
                            <dt>2.</dt>
                            <dd>
                                <div>zwar unsachgemäß durchgeführt worden ist, dies jedoch weder auf einer unsachgemäßen
                                    Montage durch den Verkäufer noch auf einem Mangel in der vom Verkäufer übergebenen
                                    Anleitung beruht.
                                </div>
                            </dd>
                        </dl></div>
                    <div className="jurAbsatz">(5) Einem Sachmangel steht es gleich, wenn der Verkäufer eine andere
                        Sache als die vertraglich geschuldete Sache liefert.
                    </div>
                </div>
            </div>

        </>
    );
}

export default Annotator;