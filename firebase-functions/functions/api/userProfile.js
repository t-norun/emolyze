const admin = require('firebase-admin');
const db = admin.firestore();

// ユーザープロファイルを追加する関数
function addUserProfile(userId, profileData) {
  const userProfileRef = db.collection('userProfiles').doc(userId);
  return userProfileRef.set(profileData);
}

module.exports = { addUserProfile };
