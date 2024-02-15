const admin = require('firebase-admin');
const db = admin.firestore();

// コミュニティを追加する関数
function addCommunity(communityId, communityData) {
  const communityRef = db.collection('communities').doc(communityId);
  return communityRef.set(communityData);
}

// コミュニティにメンバーを追加する関数
function addMemberToCommunity(communityId, userId, memberData) {
  const memberRef = db.collection('communities').doc(communityId).collection('members').doc(userId);
  return memberRef.set(memberData);
}

module.exports = { addCommunity, addMemberToCommunity };
