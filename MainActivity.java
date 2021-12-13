package com.example.sumon.androidvolley;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import org.json.JSONException;

import com.example.sumon.androidvolley.Admin.AdminLoginRequestActivity;
import com.example.sumon.androidvolley.guest.GuestActivity;

/**
 * The type Main activity.
 */
public class MainActivity extends Activity implements OnClickListener {
    private Button btnExistingUser, btnCreateAcct, btnGuestUser, btnAdminUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnExistingUser = (Button) findViewById(R.id.btnExistingUser);
        btnCreateAcct = (Button) findViewById(R.id.btnNewUser);
        btnGuestUser= (Button) findViewById(R.id.btnGuestUser);
        btnAdminUser= (Button) findViewById(R.id.btnAdminUser);

        // button click listeners
        btnExistingUser.setOnClickListener(this);
        btnCreateAcct.setOnClickListener(this);
        btnGuestUser.setOnClickListener(this);
        btnAdminUser.setOnClickListener(this);
    }

    /**
     * Try login for testing.
     *
     * @param u            the username input given
     * @param p            the password input given
     * @param loginHandler the login handler class to check
     * @return the boolean returns true if login was successful
     * @throws JSONException the json exception
     */
    public boolean tryLogin(String u, String p, LoginRequestActivity loginHandler) throws JSONException {
        boolean t = loginHandler.makeJsonArryReq(u, p);
        if (t) {
            return true;
        }
        return false;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnExistingUser:
                startActivity(new Intent(MainActivity.this,
                        LoginRequestActivity.class));
                break;
            case R.id.btnNewUser:
                startActivity(new Intent(MainActivity.this,
                        CreateAccountActivity.class));
                break;
            case R.id.btnGuestUser:
                startActivity(new Intent(MainActivity.this,
                        GuestActivity.class));
                break;
            case R.id.btnAdminUser:
                startActivity(new Intent(MainActivity.this,
                        AdminLoginRequestActivity.class));
                break;
            default:
                break;
        }
    }

}
