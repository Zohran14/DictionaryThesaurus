import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, {useRef, useState} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {definition} from "../components/thesaurus";

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
          <IonInput value={value} onIonInput={e => {
  setValue((e.target as HTMLInputElement).value)
}} clearInput/>
        </IonItem>
        <IonItem>
          <IonButton onClick={async () => {
            console.log(value.split(" "))
            ref.current!.innerHTML = "";
            await definition(value.split(" "), ref.current!);
          }}>Submit</IonButton>
        </IonItem>
        <IonItem>
            <IonText ref={ref}/>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
