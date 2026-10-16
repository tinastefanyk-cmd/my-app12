import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity, Clipboard, Alert } from 'react-native';

export default function App() {
  const [antallTegn, setAntallTegn] = useState("10");
  const [minSymboler, setMinSymboler] = useState("2");
  const [passord, setPassord] = useState("");
  const [isEnabledStoreBokstaver, setIsEnabledStoreBokstaver] = useState(true);
  const [isEnabledSmaaBokstaver, setIsEnabledSmaaBokstaver] = useState(true);
  const [isEnabledTall, setIsEnabledTall] = useState(true);
  const [isEnabledSymboler, setIsEnabledSymboler] = useState(true);

  function genererPassord(
    isSmaaBokst: boolean,
    isStoreBokst: boolean,
    isTall: boolean,
    isSymb: boolean,
    antTegn: string,
    minSymbKrav: string
  ): string {
    let smaaBokstaver = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let storeBokstaver = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let tall = ["0","1","2","3","4","5","6","7","8","9"];
    let symboler = ["#","$","%","&","*"];
    let lovligeTegn: string[] = [];
    
    if (isSmaaBokst) {
      lovligeTegn = lovligeTegn.concat(smaaBokstaver);
    }
    if (isStoreBokst){      
      lovligeTegn = lovligeTegn.concat(storeBokstaver);
    }
    if (isTall) {      
      lovligeTegn = lovligeTegn.concat(tall);
    }
    if (isSymb) {      
      lovligeTegn = lovligeTegn.concat(symboler);
    }

    if (lovligeTegn.length === 0 || !antTegn) {
      return "Velg tegn og antall!";
    }

    const minKrav = isSymb ? (parseInt(minSymbKrav, 10) || 0) : 0;
    let generertPassordTekst = "";
    let antallFunnetSymboler = 0;
    let forsok = 0;

    do {
      let tempPassordArray = [];
      antallFunnetSymboler = 0;

      for (let i = 0; i < parseInt(antTegn, 10); i++) {
        let tilfeldigTegn = lovligeTegn[Math.floor(Math.random() * lovligeTegn.length)];
        tempPassordArray.push(tilfeldigTegn);

        if (symboler.includes(tilfeldigTegn)) {
          antallFunnetSymboler++;
        }
      }

      generertPassordTekst = tempPassordArray.join('');
      forsok++;

      if (forsok > 1000) break;

    } while (isSymb && antallFunnetSymboler < minKrav);

    return generertPassordTekst;
  }

  const handleGenerate = () => {
    const res = genererPassord(
      isEnabledSmaaBokstaver, 
      isEnabledStoreBokstaver, 
      isEnabledTall, 
      isEnabledSymboler, 
      antallTegn,
      minSymboler
    );
    setPassord(res);
  };

  const copyToClipboard = () => {
    if (passord && passord !== "Velg tegn og antall!") {
      Clipboard.setString(passord);
      Alert.alert('Kopiert!', 'Passordet er kopiert til utklippstavlen.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passordgenerator</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Store bokstaver</Text>
        <Switch
          trackColor={{ false: '#ddd', true: '#2ecc71' }}
          thumbColor={'#fff'}
          onValueChange={() => setIsEnabledStoreBokstaver(!isEnabledStoreBokstaver)}
          value={isEnabledStoreBokstaver}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Små bokstaver</Text>
        <Switch
          trackColor={{ false: '#ddd', true: '#2ecc71' }}
          thumbColor={'#fff'}
          onValueChange={() => setIsEnabledSmaaBokstaver(!isEnabledSmaaBokstaver)}
          value={isEnabledSmaaBokstaver}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tall</Text>
        <Switch
          trackColor={{ false: '#ddd', true: '#2ecc71' }}
          thumbColor={'#fff'}
          onValueChange={() => setIsEnabledTall(!isEnabledTall)}
          value={isEnabledTall}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Symboler</Text>
        <Switch
          trackColor={{ false: '#ddd', true: '#2ecc71' }}
          thumbColor={'#fff'}
          onValueChange={() => setIsEnabledSymboler(!isEnabledSymboler)}
          value={isEnabledSymboler}
        />
      </View>

      {isEnabledSymboler && (
        <View style={styles.row}>
          <Text style={styles.label}>Min. antall symboler</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={minSymboler}
            onChangeText={setMinSymboler}
            maxLength={2}
          />
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.label}>Antall tegn</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={antallTegn}
          onChangeText={setAntallTegn}
          maxLength={2}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Generer passord</Text>
      </TouchableOpacity>

      {passord !== '' && (
        <TouchableOpacity onPress={copyToClipboard} style={styles.resultContainer}>
          <Text style={styles.passwordText}>{passord}</Text>
          <Text style={styles.copyHint}>Trykk for å kopiere</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff0f3',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 25,
    color: '#d81b60',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fce4ec',
    shadowColor: '#d81b60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    color: '#4a4a4a',
    fontWeight: '500',
  },
  input: {
    width: 50,
    height: 38,
    borderWidth: 1.5,
    borderColor: '#f8bbd0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#d81b60',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 15,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    borderWidth: 1.5,
    borderColor: '#2ecc71',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
    letterSpacing: 1,
    textAlign: 'center',
  },
  copyHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
});