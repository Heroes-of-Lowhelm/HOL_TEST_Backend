using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.IO;


public class DatabaseHandler : MonoBehaviour
{
    [SerializeField] private string m_loginUrl;
    [SerializeField] private string m_username;
    [SerializeField] private string m_password;
    private string m_postingReply;
    private void Start()
    {
        Login(m_username, m_password);
    }
    private IEnumerator LoginUser(string i_Url, string i_Username, string i_Password)
    {
        WWWForm form = new WWWForm();

        form.AddField("userName", i_Username);
        form.AddField("password", i_Password);

        WWW posting = new WWW(i_Url, form);
        yield return posting;

        if (posting.error != null)
        {
            print(posting.error);
        }
        else
        {
            m_postingReply = posting.text;
            print(posting.text);
            if (m_postingReply.Equals("1"))
            {
                // Log in successful
                print("Log in successful");
            }
            else if(m_postingReply.Equals("Account is currently logged in."))
            {
                print("User is currently logged in");
            }
            else if (m_postingReply.Equals("Incorrect credentials."))
            {
                print("Incorrect credentials.");
            } 
        }
    }

    public void Login(string i_userName, string i_password)
    {
        StartCoroutine(LoginUser(m_loginUrl, i_userName, i_password));
    }
}
