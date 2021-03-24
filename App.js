import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  function goalInputHandler(enteredText) {
    setEnteredGoal(enteredText);
  }

  function addGoalHandler() {
    console.log("in addGoalhANDLER");
    //FLATLIST NEEDS EACH ITEM IN YOUR DATA TO BE AN OBJECT WITH A KEY PROPERTY IN ORDER TO DYNAMICALLY ADD KEY PROP TO EACH ITEM. IT DOES THIS AUTOMATICALLY
    setCourseGoals(currGoals => [...currGoals, {key: Math.random().toString(), value: enteredGoal}]);
  }

  function removeGoalHandler(goalId) {
    setCourseGoals(currGoals => {
      return currGoals.filter(goal => goal.key !== goalId)
    });
  }

  function showModal() {
    console.log("IN SHOW MODAL");
    setIsAddMode(true);
  }

  return (
    <View style={styles.screen}>
      <Button title="ADD NEW GOAL" onPress={() => showModal()}/>
      <Modal visible={isAddMode} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Course Goal" 
            style={styles.input} 
            onChangeText={goalInputHandler}
            value={enteredGoal}
          />
          <Button title="ADD" onPress={addGoalHandler}/>
        </View>
      </Modal>

      {/* FLATLIST IS LIKE SCROLL VIEW BUT DOESN'T PRE RENDER ALL ITEMS IN THIS LIST, SO IT IS MORE EFFICEINT FOR SCROLLING THROUGH LARGE LIST OF ITEMS */}
      <FlatList 
        // IF YOUR DATASET'S UNIQUE ID ISN'T LABELED KEY, BUT MAYBE ID, YOU HAVE TO ADD THE KEYEXTRACTOR CONFIGURATION IN ORDER TO LET FLATLIST KNOW WHERE TO FIND THAT VALUE
        // keyExtractor={(item, idx) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          //INSTEAD OF TOUCHABLEOPACITY, YOU CAN ALSO USE TOUCHABLEHIGHLIGHT WHICH CHANGES BACKGROUND COLOR INSTEAD OF OPACITY, OR TOUCHABLEWITHOUTFEEDBACK WHICH DOESNT CHANGE ANYTHING ON THE COMPONENT YOU TOUCHED
          <TouchableOpacity activeOpacity={0.8} onPress={() => removeGoalHandler(itemData.item.key)}>
            <View style={styles.listItem}>
              <Text>{itemData.item.value}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  listItem: {
    padding: 10,
    margin: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }
});
