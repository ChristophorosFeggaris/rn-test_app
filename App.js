import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAdMode] = useState(false);


  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [...currentGoals, { id: Math.random().toString(), value:goalTitle } ]);
    setIsAdMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
  };

  const cancelGoalAdittionHandler = () => {
    setIsAdMode(false);
  };

  return (
    <View style={styles.screen}>
    <Button title="Add a New Goal" onPress={() => setIsAdMode(true)} />
      <GoalInput 
        visible={isAddMode} 
        onAddGoal={ addGoalHandler }
        onCancel={cancelGoalAdittionHandler}
      />
      <FlatList
        keyExtractor={ (item, index) => item.id } 
        data={courseGoals} 
        renderItem={itemData => 
            <GoalItem  id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />
        } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
  
});
