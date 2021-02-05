import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const STORAGE_KEY = "@save_name";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  state = {
    text: "",
    name: "",
  };

  componentDidMount=()=> {
    this.retrieveData();
  };

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
      alert("오늘에 집중♥");
      this.setState({ name });
    } catch (e) {
      alert("Failed to save name.");
    }
  };

  removeEverything = async () => {
    try {
      await AsyncStorage.clear();
      alert("초기화♥");
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
      <SafeAreaView style={styles.container}>
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
          <Text style={styles.buttonText}>초기화</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
      </SafeAreaView>
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
    backgroundColor: "#00ADCF",
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
    backgroundColor: "#FF851B",
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
