import { adminAuthClient } from "../../utils/invitation-email";

export function AuthButtonInvitation({ email }) {
  async function handleSendInvitationLink() {
    const { data, error } = await adminAuthClient.inviteUserByEmail(email);
    if (error) console.log(error);
    console.log(data);
  }
  return (
    <header>
      <button
        className="
        bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
      "
        onClick={handleSendInvitationLink}
      >
        Invitar
      </button>
    </header>
  );
}
