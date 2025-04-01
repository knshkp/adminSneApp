import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('Pending');
    const [newTask, setNewTask] = useState({ name: '', phone: '', address: '', description: '', status: 'Pending',group:'',subGroup:'' });
    const [modalVisible, setModalVisible] = useState(false);

    const fetchTasks = async () => {
        try {
            const employeeDetails = await AsyncStorage.getItem('userDetails');
            console.log(`>>>>>>>>>>>>>emp>>>>>${employeeDetails}`)
            const employeeDetail = JSON.parse(employeeDetails);
            const response = await axios.get(`https://sangramindustry-i5ws.onrender.com/employeeServices/getEmployeeComplaint?phone=${employeeDetail.phone}`);
            setTasks(response.data.result);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            Alert.alert('Error', 'Failed to load tasks.');
        }
    };

    const handleAddTask = async () => {
        try {
            const employeeDetails = await AsyncStorage.getItem('userDetails');
            console.log(`>>>>>>EMPLO>>>>${employeeDetail}`)
            const employeeDetail = JSON.parse(employeeDetails);
            const body = {
                customer_name: newTask.name,
                customer_phone: newTask.phone,
                customer_address: newTask.address,
                pending_staff_name: employeeDetail[0].vendor_name,
                pending_staff_phone: employeeDetail[0].phone_number,
                pending_staff_date: moment().format('Do MMMM YYYY'),
                pending_staff_time: moment().format('h:mm a'),
                description: newTask.description,
                status: 'Pending',
                group:newTask.group,
                subGroup:newTask.subGroup
            };
            

            await axios.post('https://sangramindustry-i5ws.onrender.com/employeeServices/addEmplohyeeComplaint', body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Alert.alert('Employee Details Added');
            setModalVisible(false);
            fetchTasks(); // Refresh the task list
        } catch (error) {
            Alert.alert('Detail Not Added');
            console.error('There was a problem with the axios operation:', error);
        }
    };
    const handleApprovedTask = async (complaintId,type) => {
        try {
            console.log(`>>>>>>>>>>${complaintId}`)
            const employeeDetails = await AsyncStorage.getItem('employeeDetails');
            const employeeDetail = JSON.parse(employeeDetails);
            const body = {
                complaintId,
                accept_staff_name: employeeDetail[0].vendor_name,
                accept_staff_phone: employeeDetail[0].phone_number,
                accept_staff_date: moment().format('Do MMMM YYYY'),
                accept_staff_time: moment().format('h:mm a'),
                status: type,
            };
            console.log(`>>>>>>>>bvody>>>>${JSON.stringify(body)}`)

            await axios.post('https://sangramindustry-i5ws.onrender.com/employeeServices/updateEmployeeComplaint', body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Alert.alert('Complaint Approved');
            fetchTasks(); // Refresh the task list
        } catch (error) {
            Alert.alert('Complaint Not Updated');
            console.error('There was a problem with the axios operation:', error);
        }
    };
    const handleCompletedTask = async (complaintId,type) => {
        try {
            console.log(`>>>>>>>>>>${complaintId}`)
            const employeeDetails = await AsyncStorage.getItem('employeeDetails');
            const employeeDetail = JSON.parse(employeeDetails);
            const body = {
                complaintId,
                completed_staff_date: moment().format('Do MMMM YYYY'),
                completed_staff_time: moment().format('h:mm a'),
                status: type,
            };
            console.log(`>>>>>>>>bvody>>>>${JSON.stringify(body)}`)

            await axios.post('https://sangramindustry-i5ws.onrender.com/employeeServices/updateEmployeeComplaint', body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Alert.alert('Complaint Approved');
            fetchTasks(); // Refresh the task list
        } catch (error) {
            Alert.alert('Complaint Not Updated');
            console.error('There was a problem with the axios operation:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleStatusChange = (taskIndex, status) => {
        const updatedTasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return { ...task, status };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const renderTasks = (status) => {
        return tasks.filter(task=>task.status===status)
            .map((task, index) => (
                <View key={index} style={styles.task}>
                    <Text style={styles.taskName}>Name: {task.customer_name}</Text>
                    <Text style={styles.taskName}>Staff: {task.pending_staff_name}</Text>
                    <Text style={styles.taskDetail}>Phone: {task.customer_phone}</Text>
                    <Text style={styles.taskDetail}>Address: {task.customer_address}</Text>
                    <Text style={styles.taskDetail}>Complaint: {task.description}</Text>
                    <Text style={styles.taskDetail}>Group: {task.group}</Text>
                    <Text style={styles.taskDetail}>subGroup: {task.subGroup}</Text>

                    {status === 'Pending' && (
                        <>
                        <Text style={styles.taskDetail}>Accepted By: {task.accept_staff_name}</Text>
                        <TouchableOpacity onPress={() => handleApprovedTask(task._id,'Running')} style={styles.statusButton}>
                            <Text style={styles.statusButtonText}  >Approved</Text>
                        </TouchableOpacity>
                        </>
                    )}
                    {status === 'Running' && (
                        <>
                        <Text style={styles.taskDetail}>Accepted By: {task.accept_staff_name} {task.accept_staff_phone}</Text>
                        <Text style={styles.taskDetail}>Accepted At: {task.accept_staff_date} {task.accept_staff_time}</Text>

                        <TouchableOpacity onPress={() => handleCompletedTask(task._id, 'Completed')} style={styles.statusButton}>
                            <Text style={styles.statusButtonText} >Complete</Text>
                        </TouchableOpacity>
                        </>
                    )}
                    {status === 'Completed' && (
                        <>
                        <Text style={styles.taskDetail}>Accepted By: {task.accept_staff_name} {task.accept_staff_phone}</Text>
                        <Text style={styles.taskDetail}>Accepted At: {task.accept_staff_date} {task.accept_staff_time}</Text>
                        <Text style={styles.taskDetail}>Completed At: {task.completed_staff_date} {task.completed_staff_time}</Text>
                        </>
                    )}
                </View>
            ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {['Pending', 'Running', 'Completed'].map(status => (
                    <TouchableOpacity
                        key={status}
                        style={[styles.tab, activeTab === status && styles.activeTab]}
                        onPress={() => setActiveTab(status)}
                    >
                    <Text style={styles.tabText}>{status}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.scrollContainer}>
                {renderTasks(activeTab)}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Customer Name"
                            value={newTask.name}
                            onChangeText={(text) => setNewTask({ ...newTask, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Customer Phone"
                            value={newTask.phone}
                            maxLength={10}
                            keyboardType='phone-pad'
                            onChangeText={(text) => setNewTask({ ...newTask, phone: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Customer Address"
                            value={newTask.address}
                            onChangeText={(text) => setNewTask({ ...newTask, address: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Complaint Group"
                            value={newTask.group}
                            onChangeText={(text) => setNewTask({ ...newTask, group: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Complaint SubGroup"
                            value={newTask.subGroup}
                            onChangeText={(text) => setNewTask({ ...newTask, subGroup: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Task Description"
                            value={newTask.description}
                            onChangeText={(text) => setNewTask({ ...newTask, description: text })}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={handleAddTask} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, styles.cancelButton]}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        paddingVertical: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        backgroundColor: '#ddd',
        borderRadius: 20,
        padding: 5,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: '#ddd',
    },
    activeTab: {
        backgroundColor: '#192841',
    },
    tabText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    task: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    taskName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    taskDetail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    statusButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#192841',
        borderRadius: 5,
        alignItems: 'center',
    },
    statusButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#192841',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        margin: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        width: '100%',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#192841',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#bbb',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TaskManagement;
