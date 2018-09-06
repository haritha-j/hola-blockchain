

/**
 * Create some sample data
 * @param {org.example.mynetwork.AddSampleData} sampleData- the trade to be processed
 * @transaction
 */
function addSampleData(sampleData) {

    var factory = getFactory();
    var NS = "org.example.mynetwork";

    var person1 = factory.newResource (NS, "Person", "P001");
    person1.name = "Haritha Jayasinghe";

    var business1 = factory.newResource(NS, "Owner", "B001");
    business1.name = "Cascadia Solutions";

    var person2 = factory.newResource (NS, "Person", "P002");
    person2.name = "John Doe";

    var business2 = factory.newResource(NS, "Owner", "B002");
    business2.name = "ABC company";

    return getParticipantRegistry(NS + '.Person')
    .then(function(personRegistry){
        return personRegistry.addAll([person1, person2]);
    })
    .then(function(){
        return getParticipantRegistry(NS + '.Owner')
    })
    .then(function(ownerRegsitry){
        return ownerRegsitry.addAll([business1, business2]);
    })
    
}  



  /**
 * Revoke access from a person
 * @param {org.example.mynetwork.RevokeAccess} rAccess- the trade to be processed
 * @transaction
  */

 function revokeAccess (rAccess) {
   
   index =-1;
   count =0;
   console.log(rAccess.chain.keyholders[0].employeeId)
	for (i in rAccess.chain.keyholders){
      if (rAccess.chain.keyholders[count].employeeId == rAccess.employee.employeeId){
        index = count;
        console.log("sd")
      }
      count+=1;
        
      
    }
    console.log(index);
   
    var NS = "org.example.mynetwork";
   
	keyholderArray = rAccess.chain.keyholders;
     if (index > -1){
         keyholderArray.splice(index, 1);
         rAccess.chain.keyholders = keyholderArray;
     }

     return getAssetRegistry(NS + '.Keychain')
     .then(function(keychainRegistry){
         return keychainRegistry.update(rAccess.chain);
     })
 }

 

/**
 * grant access to a person
 * @param {org.example.mynetwork.GrantAccess} gAccess- the trade to be processed
 * @transaction
 */

function grantAccess (gAccess) {

    var NS = "org.example.mynetwork";

    gAccess.chain.keyholders.push(gAccess.employee);

     return getAssetRegistry(NS + '.Keychain')
     .then(function(keychainRegistry){
         return keychainRegistry.update(gAccess.chain);
     })
 }