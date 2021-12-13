package com.example.sumon.androidvolley.Admin;
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
public class AdminActivity extends Activity implements OnClickListener {
    private Button btnBack;
    private Button btnLogout;
    private Button btnFriends;
    private Button btnAddFriend;
    private Button btnRemoveFriend;
    private Button btnSettings;
    private Button btnDeleteUser;
    private Button btnUpdateUser;
    private Button btnGetAll;
    private Button btnGetCount;
    private ImageView btnChangeImg;
    private TextView name;

    public static String getName = AdminLoginRequestActivity.name;
    public static String username = LoginRequestActivity.username;

    private String TAG = AdminActivity.class.getSimpleName();
    private ProgressDialog pDialog;
    private String tag_json_arry = "jarray_req";
    private String tag_json_string = "jstring_req";

    private TextView allUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profile_admin);


        pDialog = new ProgressDialog(this);
        pDialog.setMessage("Loading...");
        pDialog.setCancelable(false);

        btnBack = (Button) findViewById(R.id.btnBack);
        btnLogout = (Button) findViewById(R.id.btnLogout);
        btnFriends = (Button) findViewById(R.id.btnFriends);
        btnAddFriend = (Button) findViewById(R.id.btnAddFriend);
        btnRemoveFriend = (Button) findViewById(R.id.btnDeleteFriend);
        btnSettings = (Button) findViewById(R.id.btnSettings);
        btnDeleteUser = (Button) findViewById(R.id.btnDeleteUser);
        btnUpdateUser = (Button) findViewById(R.id.btnUpdateUser);
        btnGetAll = (Button) findViewById(R.id.btnGetAllUser);
        btnGetCount = (Button) findViewById(R.id.btnGetCount);
        btnChangeImg = (ImageView) findViewById(R.id.ChangeImg);


        // button click listeners
        btnBack.setOnClickListener(this);
        btnLogout.setOnClickListener(this);
        btnFriends.setOnClickListener(this);
        btnAddFriend.setOnClickListener(this);
        btnRemoveFriend.setOnClickListener(this);
        btnSettings.setOnClickListener(this);
        btnDeleteUser.setOnClickListener(this);
        btnUpdateUser.setOnClickListener(this);
        btnGetAll.setOnClickListener(this);
        btnGetCount.setOnClickListener(this);
        btnChangeImg.setOnClickListener(this);

        allUser = (TextView) findViewById(R.id.allUser);

        name = (TextView) findViewById(R.id.setName);
        name.setText(getName);
    }

    private void showProgressDialog() {
        if (!pDialog.isShowing())
            pDialog.show();
    }
    private void hideProgressDialog() {
        if (pDialog.isShowing())
            pDialog.hide();
    }

    public boolean makeJsonArryReq() {
        String url = Const.URL_ALL;
        showProgressDialog();
        JsonArrayRequest req = new JsonArrayRequest(url,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        Log.d(TAG, response.toString());
                        allUser.setText(response.toString());
                        allUser.setMovementMethod(new ScrollingMovementMethod());
                        hideProgressDialog();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                VolleyLog.d(TAG, "Error: " + error.getMessage());
                hideProgressDialog();
            }
        });

        // Adding request to request queue
        AppController.getInstance().addToRequestQueue(req,
                tag_json_arry);

        return true;

        // Cancelling request
        // ApplicationController.getInstance().getRequestQueue().cancelAll(tag_json_arry);
    }

    public boolean makeJsonArryReqCount() {
        String url = Const.URL_COUNT;
        showProgressDialog();
        StringRequest req = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d(TAG, response);
                allUser.setText(response);
                hideProgressDialog();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("error",error.toString());
            }
        });

        // Adding request to request queue
        AppController.getInstance().addToRequestQueue(req,
                tag_json_string);

        return true;
        // Cancelling request
        // ApplicationController.getInstance().getRequestQueue().cancelAll(tag_json_arry);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnLogout:
                startActivity(new Intent(AdminActivity.this,
                        MainActivity.class));
                break;
            case R.id.btnBack:
                startActivity(new Intent(AdminActivity.this,
                        LoginRequestActivity.class));
                break;
            case R.id.btnFriends:
                startActivity(new Intent(AdminActivity.this,
                        FriendsListRequestActivity.class));
                break;
            case R.id.btnAddFriend:
                startActivity(new Intent(AdminActivity.this,
                        AddFriendActivity.class));
                break;
            case R.id.btnDeleteFriend:
                startActivity(new Intent(AdminActivity.this,
                        AddFriendActivity.class));
            case R.id.btnGetAllUser:
                makeJsonArryReq();
            case R.id.btnGetCount:
                makeJsonArryReqCount();
            case R.id.btnDeleteUser:
                startActivity(new Intent(AdminActivity.this,
                        DeleteUserActivity.class));
            default:
                break;
        }
    }

}
