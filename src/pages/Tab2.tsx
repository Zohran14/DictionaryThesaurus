import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonText } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import {useRef, useState} from "react";
import {thesaurus} from "../components/thesaurus";

const Tab2: React.FC = () => {
    const [value, setValue] = useState("");
    const ref = useRef<HTMLIonTextElement>(null);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Thesaurus</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Thesaurus</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonInput value={value} onIonInput={e => {
                        setValue((e.target as HTMLInputElement).value)
                    }} clearInput/>
                </IonItem>
                <IonItem>
                    <IonButton onClick={async () => {
                        console.log(value.split(" "));
                        ref.current!.innerHTML = "";
                        thesaurus(value.split(" "), ref.current!);
                    }}>Submit</IonButton>
                </IonItem>
                <IonItem>
                    <IonText ref={ref}/>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
