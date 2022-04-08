import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, {useRef, useState} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {definition} from "../components/thesaurus";
import { clipboardOutline } from 'ionicons/icons';

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
const Tab1: React.FC = () => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLIonTextElement>(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dictionary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dictionary</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonInput className="input" value={value} onIonInput={e => {
  setValue((e.target as HTMLInputElement).value)
}} clearInput onKeyUp={(e) => {
  if (e.key.toLowerCase() === "enter") {
    document.getElementById("button")!.click();
  }
}}/>
        </IonItem>
        <IonItem>
          <IonButton onClick={async () => {
            let value2 = removeSpaces(value);
            ref.current!.innerHTML = "";
            await definition(value2.split(" "), ref.current!);
          }} id="button">Submit</IonButton>
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

export default Tab1;
