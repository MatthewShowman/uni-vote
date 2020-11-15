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

//const helpers = require('../helpers.js');


/* ****************** PARTICIPANTS  ****************** */

// ******* VOTER ******* 

/**
 * Sample transaction processor function.
 * @param {org.univote.addVoter} newVoterData The sample transaction instance.
 * @transaction
 */

 async function addVoter(newVoterData) {

    // Create participant registry connection
    const VoterRegistry = await getParticipantRegistry('org.univote.Voter');
    
    // Create the factory to build the participant
    var factory = getFactory();

    // Create the new participant resources
    var newVoter = factory.newResource('org.univote', 'Voter', createId());

    // Build the asset key-value pairs
    newVoter.firstName = newVoterData.firstName;
    newVoter.lastName = newVoterData.lastName;
    newVoter.address = newVoterData.address;
    newVoter.city = newVoterData.city;
    newVoter.state = newVoterData.state;
    newVoter.zip = newVoterData.zip;
    newVoter.jurisdiction = newVoterData.jurisdiction;

    // Add the voter perticipant to the blockchain
    await VoterRegistry.add(newVoter);

    // Create the return value JSON
    returnValue = {
        'firstName' : newVoter.firstName,
        'lastName' : newVoter.lastName,
        'address' : newVoter.address,
        'city' : newVoter.city,
        'state' : newVoter.state,
        'zip' : newVoter.zip,
        'jurisdiction' : newVoter.jurisdiction
    };

    return returnValue;
 }

/**
 * Sample transaction processor function.
 * @param {org.univote.updateVoter} updateVoterData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteVoter} deleteVoterData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.


// ******* VERIFIER ******* 

/**
 * Sample transaction processor function.
 * @param {org.univote.addVerifier} newVerifierData The sample transaction instance.
 * @transaction
 */

async function addVerifier(newVerifierData) {

    // Create participant registry connection
    const VerifierRegistry = await getParticipantRegistry('org.univote.Verifier');
    
    // Create the factory to build the participant
    var factory = getFactory();

    // Create the new participant resources
    var newVerifier = factory.newResource('org.univote', 'Verifier', createId());

    // Build the asset key-value pairs
    newVerifier.firstName = newVerifierData.firstName;
    newVerifier.lastName = newVerifierData.lastName;

    /// Add the verifier participant to the blockchain
    await VerifierRegistry.add(newVerifier);

    // Create the return value JSON
    returnValue = {
        'firstName' : newVerifier.firstName,
        'lastName' : newVerifier.lastName,
    };

    return returnValue;
 }
 
/**
 * Sample transaction processor function.
 * @param {org.univote.updateVerifier} updateVerifierData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteVerifier} deleteVerifierData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.




/* ****************** ASSETS  ****************** */

// ******* ELECTION ******* 

/**
 * Sample transaction processor function.
 * @param {org.univote.addElection} newElectionData The sample transaction instance.
 * @transaction
 */

async function addElection(newElectionData) {

    // Create participant registry connection
    const ElectionRegistry = await getAssetRegistry('org.univote.Election');
    
    // Create the factory to build the asset
    var factory = getFactory();

    // Create the new asset resources
    var newElection = factory.newResource('org.univote', 'Election', createId());

    // Build the asset key-value pairs
    newElection.electionName = newElectionData.electionName;
    newElection.electionDescription = newElectionData.electionDescription;
    newElection.startDate = newElectionData.startDate;
    newElection.endDate = newElectionData.endDate;

    // Add the election asset to the blockchain
    await ElectionRegistry.add(newElection);

    // Create the return value JSON
    returnValue = {
        'electionName' : newElection.electionName,
        'electionDescription' : newElection.electionDescription,
        'startDate' : newElection.startDate,
        'endDate' : newElection.endDate
    };

    return returnValue;
 }

 /**
 * Sample transaction processor function.
 * @param {org.univote.updateElection} updateElection The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteElection} deleteElection The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.


// ******* CONTEST ******* 

/**
 * Sample transaction processor function.
 * @param {org.univote.addContest} newContestData The sample transaction instance.
 * @transaction
 */

async function addContest(newContestData) {

    /*
		newContestData should include these:
		1. the variables to create teh object
		2. the election asset token: election
	*/

    // Create asset registry connections
    const ContestRegistry = await getAssetRegistry('org.univote.Contest');
    const ElectionRegistry = await getAssetRegistry('org.univote.Election');
    
    // Create the factory to build the asset
    var factory = getFactory();

    // Create the new asset resources
    var newContest = factory.newResource('org.univote', 'Contest', createId());

    // Build the asset key-value pairs
    newContest.contestName = newContestData.contestName;
    newContest.ContestDescription = newContestData.ContestDescription;
    newContest.jurisdiction = newContestData.jurisdiction;
    newContest.election = newContestData.election;

    // Add the election asset to the blockchain
    await ContestRegistry.add(newContest);

    // Update the election asset
        // Get the added contest
        // May not need thos step
    let addedContest = await ContestRegistry.get(newContest);
        // Append the data to the contests array in the election asset
    newContestData.election.contests.push(addedContest);
        // update the election asset on the blockchain
    await ElectionRegistry.update(newContestData.election);

    // Create the return value JSON
    returnValue = {
        'electionName' : newContest.election.electionName,
        'contestName' : newContest.contestName,
        'contestDescription' : newContest.contestDescription,
        'jurisdiction' : newContest.jurisdiction
    };

    return returnValue;
 }

/**
 * Sample transaction processor function.
 * @param {org.univote.updateRace} updateContestData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteRace} deleteContestData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.


// ******* CANDIDATE ******* 

/**
 * Sample transaction processor function.
 * @param {org.univote.addCandidate} newCandidateData The sample transaction instance.
 * @transaction
 */

async function addCandidate(newCandidateData) {

    // Create participant registry connection
    const CandidateRegistry = await getAssetRegistry('org.univote.Candidate');
    const ContestRegistry = await getAssetRegistry('org.univote.Contest');

    // Create the factory to build the asset
    var factory = getFactory();

    // Create the new asset resources
    var newCandidate = factory.newResource('org.univote', 'Candidate', createId());

    // Build the asset key-value pairs
    newCandidate.candidate = newCandidateData.voter;
    newCandidate.election = newCandidateData.election;
    newCandidate.contest = newCandidateData.contest;
    newCandidate.election = newCandidateData.election;

    // Add the candidate asset to the blockchain
    await CandidateRegistry.add(newCandidate);

    // Update the contest asset
        // Get the added candidate
        // May not need this step
    let addedCandidate = await CandidateRegistry.get(newCandidate);
        // Append the data to the contests array in the election asset
    newCandidateData.contest.push(addedCandidate);
        // update the election asset on the blockchain
    await ContestRegistry.update(newCandidateData.contest);

   // Create the return value JSON
    let returnValue = {
        'firstName' : newCandidate.candidate.firstName,
        'lastName' : newCandidate.candidate.lastName,
        'contest' : newCandidate.contest.contestName
    };

    return returnValue;
 }

/**
 * Sample transaction processor function.
 * @param {org.univote.updateCandidate} updateCandidateData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteCandidate} deleteCandidateData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.


// ******* MEASURE ******* 

/**
 * Sample transaction processor function.
 * @param {org.univote.addMeasure} newMeasureData The sample transaction instance.
 * @transaction
 */

async function addMeasue(newMeasureData) {

    // Create registry connections
    const MeasureRegistry = await getAssetRegistry('org.univote.Measure');
    const ElectionRegistry = await getAssetRegistry('org.univote.Election');

    // Create the factory to build the asset
    var factory = getFactory();

    // Create the new asset resources
    var newMeasure = factory.newResource('org.univote', 'Measure', createId());

    // Build the asset key-value pairs
    newMeasure.measureName = newMeasureData.measureName;
    newMeasure.measureDescription = newMeasureData.measureDescription;
    newMeasure.jurisdiction = newMeasureData.jurisdiction;
    newMeasure.election = newMeasureData.election;

    // Add the measure asset to the blockchain
    await MeasureRegistry.add(newMeasure);

    // Update the contest asset
        // Get the added candidate
        // May not need this step
    let addedMeasure = await MeasureRegistry.get(newMeasure);
        // Append the data to the contests array in the election asset
    newMeasureData.election.measures.push(addedMeasure);
        // update the election asset on the blockchain
        await ElectionRegistry.update(newMeasureData.election);

    // Create the return value JSON
    returnValue = {
        'measureName' : newMeasure.measureName,
        'measureDescription' : newMeasure.measureDescription,
        'jurisdiction' : newMeasure.jurisdiction,
        'electionName' : newMeasure.election.electionName
    };

    return returnValue;
 }

/**
 * Sample transaction processor function.
 * @param {org.univote.updateMeasure} updateMeasureData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteMeasure} deleteMeasureData The sample transaction instance.
 * @transaction
 */

// This transaction to be developed at a later date.




/* ****************** TRANSACTIONS  ****************** */

// ******* VOTING ******* 

/**
 * Sample transaction processor function.
 * @param {org.univote.submitVote} voteSubmissionData The sample transaction instance.
 * @transaction
 */

 async function submitVote(voteSubmissionData) {

    let candidateVotes = voteSubmissionData.candidateVotes;
    let measureVotes = voteSubmissionData.measureVotes;

    const CandidateRegistry = await getAssetRegistry('org.univote.Candidate');
    const MeasureRegistry = await getAssetRegistry('org.univote.Measure');

    for(i=0; i<candidateVotes.length; i++) {
        let currentCandidate = await CandidateRegistry.get(candidateVotes[i]);
        currentCandidate.voteCount = currentCandidate.voteCount + 1;
        await CandidateRegistry.update(currentCandidate.voteCount);
    }

    for(i=0; i<measureVotes.length; i++) {
        let currentMeasure = await MeasureRegistry.get(measureVotes[i]);

        if (measureVotes[i][1] == true) {
            currentMeasure.yesVote = currentMeasure.yesVote + 1;
            await MeasureRegistry.update(currentMeasure.yesVote);
        } else if (measureVotes[i][1] == false) {
            currentMeasure.noVote = currentMeasure.noVote + 1;
            await MeasureRegistry.update(currentMeasure.noVote);
        }
    }

    return await createVoteCert(voteSubmissionData);

 }

 /**
 * Sample transaction processor function.
 * @param {org.univote.createVoteCert} successfulVoteData The sample transaction instance.
 * @transaction
 */

 async function createVoteCert(successfulVoteData) {

    const voteCertRegistry = await getAssetRegistry('org.univote.VoteCert')

    // Create the unique measureId hash
    let voteCertId = createId()

    let newVoteCert = {
        'voteCertId' : voteCertId,
        'voter' : successfulVoteData.voter,
        'election' : successfulVoteData.election,
    }

    await voteCertRegistry.add(newVoteCert);
    let officialVoteCert = await voteCertRegistry.get(voteCertId);

    let returnValue = {
        'voter' : officialVoteCert.voter.firstName + " " + officialVoteCert.voter.lastName,
        'election' : officialVoteCert.election.electionName
    }

    return returnValue;
 }



 /**************** HELPERS *****************/

function checkZIP(inputZIP) {
    retVal = true;
    if (inputZIP.length == 5)
        for (i = 0; i < 5; i++) {
            if (isNaN(inputZIP.substr(i,1)))
            retVal = false;
        }
    else
        retVal = false;

    return retVal;
}

function createId() {
    finalHash = ''
    const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz!*$@';

    for(i=0; i < 64; i++) {
        randomChar = alphaNum[Math.floor(Math.random() * alphaNum.length)];
        finalHash = finalHash + randomChar;
    }

    return finalHash;
}

async function addContestToElection(newContestData) {

    // Create participant registry connection
    const ElectionRegistry = await getAssetRegistry('org.univote.Election');

    let newContest = newContestData.contest;

    // Add the new contest to the election object
    newContestData.election.contests.push(newContest)

    // Update the election asset on the blockchain
    await ElectionRegistry.update(newContestData.election);
}