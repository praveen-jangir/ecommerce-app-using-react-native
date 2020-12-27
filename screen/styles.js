import { StyleSheet,Dimensions } from "react-native"
export const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listItem:{
    margin:5,
    padding:10,
    backgroundColor:"#FFF",
    width:"100%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
  },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius:80
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 80,
        overflow: "hidden"
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        top:100,
        left: 40,
        width: 35,
        height: 35,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 0
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 12
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 343,
        height: 650,
        borderRadius: 12,
        overflow: "hidden",
        marginTop:10,
        marginHorizontal: 10
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },

    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10,
  },
   MainContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor:"white",
  },
  Main: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor:"black",
    position: "absolute",
    height:"100%",
    width:"100%",
  },
  imageThumbnail: {
    alignItems: 'center',
    height: 200,
    width:175,
    marginTop:-20,
    position:"relative"
  },
   Logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width:50,
    borderRadius:100,
    marginLeft:10,
    marginTop:6,
  },
    Thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    width:"100%",
  },
  stretch: {
    width: '100%',
    height: '50%',
    resizeMode: 'stretch'
  },

  TouchableOpacityStyle:{

    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    top: 140,
  },

  FloatingButtonStyle: {

    resizeMode: 'contain',
    width: 100,
    height: 100,
  },containerx: {
        flex: 1,
        backgroundColor: "#FFF",
        height:350,
    },
  imageThumbnailx: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width:150,
    marginTop:5,
  },
    XThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    width:160,
  },
  child: {
    height: height * 0.5,
    width,
    justifyContent: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: "white",
    padding: 35,
    height:150,
  },

  listItemXb:{
    margin:5,
    padding:10,
    backgroundColor:"#FFF",
    width:"100%",
    flex:1,
    height:250,
    alignSelf:"center",
    flexDirection:"row",
  },
  listItemb:{
    margin:5,
    padding:10,
    backgroundColor:"#FFF",
    width:"100%",
    flex:1,
    height:180,
    alignSelf:"center",
    flexDirection:"row",
  },
  listItemX:{
    margin:5,
    padding:10,
    backgroundColor:"#FFF",
    width:"100%",
    flex:1,
    height:80,
    alignSelf:"center",
    flexDirection:"row",
  },
  listItemxx:{
    margin:5,
    padding:10,
    backgroundColor:"#FFF",
    width:"100%",
    flex:1,
    height:180,
    alignSelf:"center",
    flexDirection:"row",
  },
   centeredViewx: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height:200,
  },
  modalViewx: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    width:"90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 100,
    padding: 10,
    elevation: 5,
    width:40,
    height:40,
    marginTop:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  containeri: {
        flex: 1,
        backgroundColor: "#FFF",
        height:250,
    },
  MainContaineri: {
    justifyContent: 'center',
    flex: 1,
    position:"relative",
    paddingTop: 5,
    backgroundColor:"#0ebcec",
  },
  imageThumbnaili: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width:150,
    marginTop:5,
  },
   Logoi: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width:150,
    marginLeft:10,
    marginTop:16,
  },
    Thumbnaili: {
    height:250,
    width:"100%",
  },
  childi: {
    height: height * 0.5,
    width,
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  }
 
})