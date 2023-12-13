import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { StyleSheet } from 'react-native';
import * as database from '../../../../database';

const PackingList = (details) => {
  const [packingList, setPackingList] = useState({});
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const packingListObject = await database.loadPackingList(details.id);
        setPackingList(packingListObject)
        return packingListObject;
      } catch (error) {
        console.error('Error loading packing list:', error);
        return [];
      }
    }
    fetchData();
  },[]);

  const handleAddItem = async() => {
    if (newItem.trim() !== '') {
      const updatedList = [newItem];
      await database.updatePackingList(details.id, updatedList); 
      setPackingList([...packingList, updatedList]);
      setNewItem('');
    }
  };

  const handleEditItem = (index, editedItem) => {
    const updatedList = [...packingList];
    updatedList[index] = editedItem;
    setPackingList(updatedList);
  };

  const handleDeleteItem = async (id, index) => {
    try {
      await database.deletePackingListItem(details.id, id);
      const updatedList = packingList.filter((_, i) => i !== index);
      setPackingList(updatedList);
    } catch (error) {
      console.error('Error deleting packing list item:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{item.item ? item.item : item}</Text>
    <TouchableOpacity onPress={() => handleDeleteItem(item.id, index)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={packingList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={true}
        style={styles.flatList}
      />
      <TextInput
        style={styles.input}
        placeholder="Add new item"
        value={newItem}
        onChangeText={(text) => setNewItem(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  flatList: {
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#21A6FC',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#21A6FC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default PackingList;
