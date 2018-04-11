var r=require('rethinkdb');

var connection = null;

r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err){
        //throw err;
        console.log('error connecting');
        return;
    }
    connection = conn;
//region insert
    // r.table('authors').insert([
    //     { name: "William Adama", tv_show: "Battlestar Galactica",
    //       posts: [
    //         {title: "Decommissioning speech", content: "The Cylon War is long over..."},
    //         {title: "We are at war", content: "Moments ago, this ship received word..."},
    //         {title: "The new Earth", content: "The discoveries of the past few days..."}
    //       ]
    //     },
    //     { name: "Laura Roslin", tv_show: "Battlestar Galactica",
    //       posts: [
    //         {title: "The oath of office", content: "I, Laura Roslin, ..."},
    //         {title: "They look like us", content: "The Cylons have the ability..."}
    //       ]
    //     },
    //     { name: "Jean-Luc Picard", tv_show: "Star Trek TNG",
    //       posts: [
    //         {title: "Civil rights", content: "There are some words I've known since..."}
    //       ]
    //     }
    // ]).run(connection, function(err, result) {
    //     if (err) 
    //         console.log('error on the insert query');
    //         //throw err;
    //     console.log(JSON.stringify(result, null, 2));
    // });
//endregion insert

//region select all
    // r.table('authors').run(connection, function(err, cursor){
    //     if(err){
    //         // throw err;
    //         console.log('error in running the select statement');
    //         return;             
    //     }
    //     cursor.toArray(function(err, result){ //The toArray function automatically iterates through the cursor and puts the documents into a JavaScript array
    //         if(err) throw err;
    //         console.log(JSON.stringify(result, null, 2));
    //     })

    // });
//endregion select all

//region select
// r.table('authors').filter(r.row('name').eq('Laura Roslin'))
//     .run(connection, function(err,cursor){
//         if(err){
//             console.log('error in running the select statement');
//             return;
//         }
//         cursor.toArray(function(err, result){
//             if(err) throw err;
//             console.log(JSON.stringify(result, null, 2));
//         });
//     });

//endregion select

//region select by id
// r.table('authors').get('53957827-8504-492c-9148-1ab25423c950')
//     .run(connection, function(err, result){
//         if(err){
//             console.log('error in running the select by id statement')
//             return;
//         }
//         console.log(JSON.stringify(result, null, 2));
//     });
//endregion select by id

//region realtime
r.table('authors').changes()
    .run(connection, function(err,cursor){
        if(err){
            console.log('error in running the select statement');
            return;
        }
        cursor.each(function(err, result){
            if(err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    });
//regionend realtime

});



