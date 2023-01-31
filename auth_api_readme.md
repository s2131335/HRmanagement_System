### Routes
<table>
  <tr>
    <th>Name & Description</th>
    <th>HTTP Method</th>
    <th>Data Types</th>
    <th>Errors</th>
  </tr>
 <tr>
    <td>
        <code>/users/list</code><br/><br/>
        List all users
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Header</b><br/>
        <code>{Authorization:Bearer token}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{usercredentials}</code>
    </td>
    <td>
    </td>
  </tr>

  <tr>
    <td>
        <code>/users/login</code><br/><br/>
        Login with username and password.
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Body Parameters</b><br/>
        <code>{username, password}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{user,token}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>500</code>) when
        <ul>
            <li>username not found, <code>""</code></li>
            <li>wrong password <code>""</code></li>
        </ul>
    </td>
  </tr>
<tr>
<td>
    <code>/users/register</code><br/><br/>
    Register with username and password.
</td>
<td>
    POST
</td>
<td>
    <b>Body Parameters</b><br/>
    <code>{username, password}</code>
    <br/><br/>
    <b>Return Object</b><br/>
    <code>{user,token}</code>
</td>
<td>
    Throw <code>HTTPError</code> (code <code>500</code>) when
    <ul>
        <li>username exist, <code>""</code></li>
    </ul>
</td>
  </tr>

  <tr>
<td>
    <code>/users/forget</code><br/><br/>
    Send reset password link to user's email (a token is added to the link)
</td>
<td>
    PUT
</td>
<td>
    <b>Body Parameters</b><br/>
    <code>{username}</code>
    <br/><br/>
    <b>Return Object</b><br/>
    <code>{}</code>
</td>
<td>
    Throw <code>HTTPError</code> (code <code>500</code>) when
    <ul>
        <li> <code>""</code></li>
    </ul>
</td>
  </tr>
  <tr>
<td>
    <code>/users/reset-password</code><br/><br/>
    Reset password.
</td>
<td>
    PUT
</td>
<td>
    <b>Body Parameters</b><br/>
    <code>{token, newpassword}</code>
    <br/><br/>
    <b>Return Object</b><br/>
    <code>{}</code>
</td>
<td>
    Throw <code>HTTPError</code> (code <code>500</code>) when
    <ul>
        <li> <code>""</code></li>
    </ul>
</td>
  </tr>
</table>


### Data structures

<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><strong>usercredentials</strong></td>
        <td>an array contains <strong>user</strong> objects</td>
    </tr>
    <tr>
        <td> <strong>user</strong></td>
        <td>an object with property: <code>username</code>, <code>password</code></td>
    </tr>
</table>