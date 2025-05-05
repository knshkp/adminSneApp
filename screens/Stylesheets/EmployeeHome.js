import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingVertical: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    customerNameText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingLeft:10
      },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
        height:50
    },
    activeTab: {
        backgroundColor: '#192841',
    },
    tabText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    salesContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    dateText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#192841',
        marginLeft:20,
        fontWeight:'bold'
    },
    datesText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#192841',
        marginLeft:150,
        marginRight:20,
        fontWeight:'bold'
    },
    dropdown: {
        marginBottom: 10,
        marginTop:10,
        borderRadius: 10,
        marginHorizontal:10,
        marginRight:10,
        width:'95%'
    },
    dropdownContainer: {
        borderRadius: 10,
        borderColor: '#ddd',
        marginHorizontal:10,
    },
    input: {
        height:50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingHorizontal: 5,
        marginHorizontal:10,
        marginTop: 5,
        marginBottom: 10,
        color: "#333",
        backgroundColor: '#fff',
        width: '95%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginHorizontal:10,
        marginBottom: 5,
        paddingHorizontal:5,
        color: "#333",
        backgroundColor: '#fff',
        width: '45%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        height:50
    },
    inputd: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginHorizontal:10,
        marginBottom: 5,
        paddingHorizontal:5,
        color: "#333",
        backgroundColor: '#fff',
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        height:50
    },
    priceText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#192841',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal:20,
        paddingHorizontal:15
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marketingText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:350
    },
    namePhoneContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});