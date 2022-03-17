import axios from 'axios';
//let words: Array<string> = ["clapboard", "repel", "palpable", "abrasion", "impose", "sylvan", "mason", "puncture", "emaciated", "furor", "void", "frivolous", "fracas", "negate", "barren", "friction", "decree", "invalid", "hindrance", "decry", "intelligible", "archive", "rebuff", "arid", "bower"]

export const definition = async (words: Array<string>, ref: HTMLIonTextElement) => {
    const urls: any = []
    words.forEach(word => {
        urls.push(axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word));
    })
    console.log(urls);
    axios.all(urls).then(axios.spread((...responses) => {
        responses.forEach((response, index) => {
            const word = words[index];
            var data = "";
            var parts = ""
            var opp = ""
            var syn = ""
            console.log(response);
            // @ts-ignore
            response.data.forEach((def: any) => {
                def.meanings.forEach((mean: any) => {
                    mean.definitions.forEach((def2:any) => {
                        data += def2.definition;
                        data += " "
                        opp += ((def2.antonyms.length > 5) ? def2.antonyms.slice(0,5) : def2.antonyms)
                        opp += ","
                        syn += ((def2.synonyms.length > 5) ? def2.synonyms.slice(0,5) : def2.synonyms)
                        syn += ","
                    })
                    parts += mean.partOfSpeech;
                    parts += ",";
                })
            })
            ref.innerHTML += (`${word}<br>Def:${data}<br><hr><br>`);
        })
    }))
}
export const thesaurus = (words: Array<string>, ref: HTMLIonTextElement): void => {
    const urls: any = []
    words.forEach(word => {
        urls.push(axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word));
    })
    axios.all(urls).then(axios.spread((...responses) => {
        console.log(responses);
        responses.forEach((response, index) => {
            const word = words[index];
            var data = "";
            var parts = ""
            var opp = ""
            var syn = ""
            console.log(response);
            // @ts-ignore
            response.data.forEach((def: any) => {
                def.meanings.forEach((mean: any) => {
                    mean.definitions.forEach((def2:any) => {
                        data += def2.definition;
                        data += ", "
                        opp += ((def2.antonyms.length > 5) ? def2.antonyms.slice(0,5).join(", ") : def2.antonyms.join(", "))
                        opp += ((opp.length > 0) ? (", "): (""));
                        syn += ((def2.synonyms.length > 5) ? def2.synonyms.slice(0,5).join(", ") : def2.synonyms.join(", "))
                        syn += ((syn.length > 0) ? (", "): (""))
                    })
                    parts += mean.partOfSpeech;
                    parts += ",";
                })
            })
            ref.innerHTML += (`${word}<br>Synonyms: ${syn.slice(0,-1)}<br>Antonyms: ${opp.slice(0,-1)}<br><hr><br>`);
        })
    }))
}
export const def2 = (words: Array<string>): any => {
    const urls: any = []
    let val: any[] = []
    words.forEach(word => {
        urls.push(axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word));
    })
    axios.all(urls).then(axios.spread((...responses) => {
        console.log(responses);
        responses.forEach((response, index) => {
            const word = words[index];
            var data = "";
            var parts = ""
            var opp = ""
            var syn = ""
            console.log(response);
            // @ts-ignore
            response.data.forEach((def: any) => {
                def.meanings.forEach((mean: any) => {
                    mean.definitions.forEach((def2:any) => {
                        data += def2.definition;
                        data += ", "
                        opp += ((def2.antonyms.length > 5) ? def2.antonyms.slice(0,5).join(", ") : def2.antonyms.join(", "))
                        opp += ((opp.length > 0) ? (", "): (""));
                        syn += ((def2.synonyms.length > 5) ? def2.synonyms.slice(0,5).join(", ") : def2.synonyms.join(", "))
                        syn += ((syn.length > 0) ? (", "): (""))
                    })
                    parts += mean.partOfSpeech;
                    parts += ",";
                })
            })
            val.push(data);
        })
        return val;
    }))
}