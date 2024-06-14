import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';



export const executeSQL = async (sql,prm,ret_fn) => 
{ 
    var ret_dets={"rCode":0,"rData":""};
    //var prm2=[];
    openDatabase({ name: 'echsmobile1.db', createFromLocation: 1 },
    (db)=>{
        db.transaction(tx => {
          tx.executeSql(
          sql,
          prm,
          (tx, result) => {
            ret_dets.rData=result;
            ret_fn(ret_dets);
          },
          err => {
            ret_dets.rCode=100; // transaction error
            ret_fn(ret_dets);
          },
        );
      });
    },
    (err)=>{
      ret_dets.rCode=101; // db data
      ret_fn(ret_dets);
    });

};