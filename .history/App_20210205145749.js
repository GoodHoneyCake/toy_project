import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@save_name";

class App extends React.Component {
  state = {
    text: "",
    name: "",
  };

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_KEY);

      if (name !== null) {
        this.setState({ name });
      }
    } catch (e) {
      alert("Failed to load name.");
    }
  };

  save = async (name) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, name);
      this.setState({ name });
    } catch (e) {
      alert("Failed to save name.");
    }
  };

  removeEverything = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  onChangeText = (text) => this.setState({ text });

  onSubmitEditing = () => {
    const onSave = this.save;
    const { text } = this.state;

    if (!text) return;

    onSave(text);
    this.setState({ text: "" });
  };

  render() {
    const { text, name } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="오늘에 집중"
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
        />
        <Text style={styles.text}>{name}</Text>
        <TouchableOpacity onPress={this.removeEverything} style={styles.button}>
          <Text style={styles.buttonText}>클릭 후 재접속 하면 초기화</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    padding: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    margin: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fc5f5f",
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default App;
