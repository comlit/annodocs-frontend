import './Annotator.css'
import SingleStringAnnotator from "./SingleStringAnnotator.tsx";
import {useEffect, useState} from "react";


function Annotator({clickedCallback}: { clickedCallback: (id: number) => void }){

    //TODO: set ids automatically, but that can only be done once the backend response and how the rendering is handled is known

    //const [focusedAnnotation, setFocusedAnnotation] = useState<number | null>(null)

    const [annotationIDs, setAnnotationIDs] = useState<string[]>(["1", "2", "3"])
    const [finishedAnnotations, setFinishedAnnotations] = useState<string[]>([])

    const finishedCallback = (id: string) => {
        setFinishedAnnotations(prevState => [...prevState, id])
    }

    useEffect(() => {
        if(finishedAnnotations.length != 0 && annotationIDs.every(id => finishedAnnotations.includes(id))){
            setFinishedAnnotations([])
            document.getSelection()?.empty()
        }
    }, [finishedAnnotations, annotationIDs])

    return (
        <>
            <div className="jnhtml">
                <div>
                    <SingleStringAnnotator
                        id={"1"}
                        text={"(1) Die Sache ist frei von Sachmängeln, wenn sie bei Gefahrübergang den subjektiven Anforderungen, den objektiven Anforderungen und den Montageanforderungen dieser Vorschrift entspricht."}
                        existingAnnotations={[
                            {id: 1, start: 90, end: 170, name: "Müller", color: "#ffcaca"},
                            {id: 2, start: 30, end: 60, name: "Schäfer", color: "#0000FF"},
                            {id: 3, start: 45, end: 120, name: "Tervel", color: "#008000"},
                            {id: 4, start: 100, end: 150, name: "Merkel", color: "#FFA500"}
                        ]}
                        finishedCallback={finishedCallback}
                        clickedCallback={clickedCallback}/>
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
                        <SingleStringAnnotator
                            id={"3"}
                            text={"Zu der Beschaffenheit nach Satz 1 Nummer 1 gehören Art, Menge, Qualität, Funktionalität, Kompatibilität, Interoperabilität und sonstige Merkmale der Sache, für die die Parteien Anforderungen vereinbart haben."}
                            existingAnnotations={[
                                {id: 1, start: 10, end: 35, name: "Müller", color: "#ffcaca"},
                                {id: 2, start: 30, end: 60, name: "Schäfer", color: "#0000FF"},
                                {id: 3, start: 45, end: 120, name: "Tervel", color: "#008000"},
                                {id: 4, start: 100, end: 150, name: "Merkel", color: "#FFA500"}
                            ]}
                            finishedCallback={finishedCallback}
                            clickedCallback={clickedCallback}/>
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
                    </dl>
                        <SingleStringAnnotator
                            id={"2"}
                            text={"Zu der üblichen Beschaffenheit nach Satz 1 Nummer 2 gehören Menge, Qualität und sonstige Merkmale der Sache, einschließlich ihrer Haltbarkeit, Funktionalität, Kompatibilität und Sicherheit. Der Verkäufer ist durch die in Satz 1 Nummer 2 Buchstabe b genannten öffentlichen Äußerungen nicht gebunden, wenn er sie nicht kannte und auch nicht kennen konnte, wenn die Äußerung im Zeitpunkt des Vertragsschlusses in derselben oder in gleichwertiger Weise berichtigt war oder wenn die Äußerung die Kaufentscheidung nicht beeinflussen konnte."}
                            existingAnnotations={[
                                {id: 1, start: 90, end: 170, name: "Müller", color: "#ffcaca"},
                                {id: 2, start: 30, end: 60, name: "Schäfer", color: "#0000FF"},
                                {id: 3, start: 45, end: 120, name: "Tervel", color: "#008000"},
                                {id: 4, start: 180, end: 400, name: "Merkel", color: "#FFA500"}
                            ]}
                            finishedCallback={finishedCallback}
                            clickedCallback={clickedCallback}/>
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