/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

const helpers = require('../helpers.js');

/* ****************** PARTICIPANTS  ****************** */

// VOTER

/**
 * Sample transaction processor function.
 * @param {org.univote.addVoter} addVoter The sample transaction instance.
 * @transaction
 */

 async function addVoter(addVoterData) {

     // set the return value variable from the start
	let returnValue = "";

	// Create asset and participant registry connections
	const VoterRegistry = await getParticipantRegistry('org.univote.Voter');
	
    // WE MAY NOT NEED TO DO THIS PART
    // THIS HELPS REMIND US WHAT TO IMPORT
    // IT DEPENDS ON IF WE WANT TO DO ERROR HANDLING IN THE FRONT END OR IN THE LOGIC
        // See the file helpers.js for an example
    // IT ALSO DEPENDS ON WHETHER WE WANT TO GIVE THE VERIFIER SELECTION MENUS OR DO MANUAL ENTRY
        // These are the values I'm pretty sure we need to get.
        // Others?
	let voterName = addVoterData.voterName;
	let voterDOB = addVoterData.voterDOB;
	let voterCity = addVoterData.voterCity;
	let voterStateAbbr = addVoterData.voterStateAbbr;
    let voterZIP = addVoterData.voterZIP;
    let voterJuris = addVoterData.voterJuris;
    
    // Create the unique voterId hash
    voterId = helpers.createId()
    // Check the ID for existing ID
    addVoterData.voterId = voterId

    returnValue = {
        // Add the values we want to return to the frontend
    };

    // Update all the voter asset to the blockchain
    await VoterRegistry.update(addVoterData.voter);
    
    return returnValue;
 }


/**
 * Sample transaction processor function.
 * @param {org.univote.updateVoter} updateVoter The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteVoter} deleteVoter The sample transaction instance.
 * @transaction
 */

//VERIFIER

/**
 * Sample transaction processor function.
 * @param {org.univote.Verifier} addVerifier The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.updateVerifier} updateVerifier The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteVerifier} deleteVerifier The sample transaction instance.
 * @transaction
 */




/* ****************** ASSETS  ****************** */

//ELECTION

/**
 * Sample transaction processor function.
 * @param {org.univote.addElection} addElection The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.updateElection} updateElection The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteElection} deleteElection The sample transaction instance.
 * @transaction
 */

//RACE

/**
 * Sample transaction processor function.
 * @param {org.univote.addRace} addRace The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.updateRace} updateRace The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteRace} deleteRace The sample transaction instance.
 * @transaction
 */

// CANDIDATE

/**
 * Sample transaction processor function.
 * @param {org.univote.addCandidate} addCandidate The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.updateCandidate} updateCandidate The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteCandidate} deleteCandidate The sample transaction instance.
 * @transaction
 */

// MEASURE

/**
 * Sample transaction processor function.
 * @param {org.univote.addMeasure} addMeasure The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.updateMeasure} updateMeasure The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteMeasure} deleteMeasure The sample transaction instance.
 * @transaction
 */




/* ****************** TRANSACTIONS  ****************** */

// VOTING

/**
 * Sample transaction processor function.
 * @param {org.univote.submitVote} submitVote The sample transaction instance.
 * @transaction
 */