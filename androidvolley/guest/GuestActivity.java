package com.example.sumon.androidvolley.guest;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.StringRequest;
import com.example.sumon.androidvolley.Admin.AddFriendActivity;
import com.example.sumon.androidvolley.Admin.AdminLoginRequestActivity;
import com.example.sumon.androidvolley.Admin.DeleteUserActivity;
import com.example.sumon.androidvolley.FriendsListRequestActivity;
import com.example.sumon.androidvolley.LoginRequestActivity;
import com.example.sumon.androidvolley.MainActivity;
import com.example.sumon.androidvolley.R;
import com.example.sumon.androidvolley.app.AppController;
import com.example.sumon.androidvolley.utils.Const;

import org.json.JSONArray;

/**
 * The type Profile activity.
 */
public class GuestActivity extends Activity implements OnClickListener {
    private Button btnBack;
    private Button btnLogout;
    private Button btnSettings;
    private TextView name;

    private String TAG = GuestActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profile_guest);

        btnBack = (Button) findViewById(R.id.btnBack);
        btnLogout = (Button) findViewById(R.id.btnLogout);


        // button click listeners
        btnBack.setOnClickListener(this);
        btnLogout.setOnClickListener(this);

        name = (TextView) findViewById(R.id.setName);
        name.setText("Guest");
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
//            case R.id.btnLogout:
//                startActivity(new Intent(GuestActivity.this,
//                        MainActivity.class));
//                break;
//            case R.id.btnBack:
//                startActivity(new Intent(GuestActivity.this,
//                        LoginRequestActivity.class));
//                break;
        }
    }

}
