const admin = require('firebase-admin');
const fs = require('fs-extra');
const yaml = require('yamljs');

admin.initializeApp({
    credential: admin.credential.cert(require('./credentials.json')),
});
const db = admin.firestore();

const quizzes = [
    'strategy-basics',
    'strategy-canvas',
    'collab-basics',
    'collab-cross',
    'launch-basics',
    'yc-basics',
    'goals-basics',
    'goals-company',
    'goals-product',
    'history-basics',
    'history-apple',
    'user-basics',
    'feedback-basics',
]


const update = async(quizId) => {

    const json = yaml.load(`quizzes/${quizId}.yaml`);

    console.log(JSON.stringify(json));

    const ref = db.collection('quizzes').doc(quizId);

    await ref.set(json, { merge: true });

    console.log('DONE');

}

for (const quiz of quizzes) {
    update(quiz);
}



