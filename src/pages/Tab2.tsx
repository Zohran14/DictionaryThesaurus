import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonText, IonIcon } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { clipboardOutline } from 'ionicons/icons';
import {useRef, useState} from "react";
import {thesaurus} from "../components/thesaurus";
import {Clipboard} from '@awesome-cordova-plugins/clipboard';

const removeSpaces = (str: string) => {
    let isChar = true;
    for (let i = (str.length - 1); i >= 0; i--) {
      if (isChar && (str[i] === " ")) {
        str = str.slice(0, -1);
      } else {
        isChar = false;
      }
    }
    return str;
}

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
                    <IonInput className="input" value={value} onIonInput={e => {
                        setValue((e.target as HTMLInputElement).value)
                    }} clearInput onKeyUp={(e) => {
                        if (e.key.toLowerCase() === "enter") {
                          document.getElementById("button2")!.click();
                        }
                      }}/>
                </IonItem>
                <IonItem>
                    <IonButton onClick={async () => {
                        let value2 = removeSpaces(value);
                        ref.current!.innerHTML = "";
                        thesaurus(value2.split(" "), ref.current!);
                    }} id="button2">Submit</IonButton>
                </IonItem>
                <IonItem>
                    <IonText ref={ref}/>
                </IonItem>
                <IonItem>
                    <IonIcon icon={clipboardOutline} onClick={() => {
                        navigator.clipboard.writeText(ref.current!.innerHTML ? ref.current!.innerHTML.replaceAll("<br>", "\n").replaceAll("<hr>", "") : "");
                    }} className="icon1"></IonIcon>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
