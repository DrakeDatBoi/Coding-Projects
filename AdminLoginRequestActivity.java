package com.example.sumon.androidvolley.Admin;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonArrayRequest;
import com.example.sumon.androidvolley.R;
import com.example.sumon.androidvolley.app.AppController;
import com.example.sumon.androidvolley.utils.Const;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * The type Login request activity.
 */
public class AdminLoginRequestActivity extends Activity implements OnClickListener {
    private String TAG = AdminLoginRequestActivity.class.getSimpleName();
    private Button btnLogin;
    private ProgressDialog pDialog;
    private EditText enterUsername, enterPassword;
    public static String username = "filler123", password = "12345!";
    private boolean success = true;
    /**
     * The constant name.
     */
    public static String name = "";

    private TextView msgResponse;

    // These tags will be used to cancel the requests
    private String tag_json_arry = "jarray_req";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.admin_login_request);

        btnLogin = (Button) findViewById(R.id.btnLogin);

        pDialog = new ProgressDialog(this);
        pDialog.setMessage("Loading...");
        pDialog.setCancelable(false);

        btnLogin.setOnClickListener(this);

        enterUsername = (EditText) findViewById(R.id.enterUsername);
        enterPassword = (EditText) findViewById(R.id.enterPassword);

        msgResponse = (TextView) findViewById(R.id.msgResponse);
    }

    private void showProgressDialog() {
        if (!pDialog.isShowing())
            pDialog.show();
    }
    private void hideProgressDialog() {
        if (pDialog.isShowing())
            pDialog.hide();
    }

    /**
     * Making json array request, Sends login info to backend
     * to see if user exists
     *
     * @param username the username
     * @param password the password
     * @return true if user exists and login was successful
     */
    public boolean makeJsonArryReq(String username, String password) {
        String url = Const.URL_Admin_LOGIN + "username=" + username + "&password=" + password;
        showProgressDialog();
        if (username == null) {
            return false;
        }
        JsonArrayRequest req = new JsonArrayRequest(url,
            new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        Log.d(TAG, response.toString());
                        msgResponse.setText(response.toString());
                        if (response.isNull(0)) {
                            onFail();
                            success = false;
                        } else {
                            success = true;
                            msgResponse.setText(response.toString());
                            try {
                                JSONObject obj = response.getJSONObject(0);
                                name = obj.getString("name");
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            onSuccess();
                        }
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
        System.out.println(success);
        return success;

        // Cancelling request
        // ApplicationController.getInstance().getRequestQueue().cancelAll(tag_json_arry);
    }

    /**
     * On success start profile page
     *
     * @return true
     */
    public boolean onSuccess() {
        startActivity(new Intent(AdminLoginRequestActivity.this,
                AdminActivity.class));
        return true;
    }

    /**
     * On fail boolean.
     *
     * @return false
     */
    public boolean onFail() {
        msgResponse.setText("Invalid info");
        makeJsonArryReq(null, null);
        return false;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnLogin:
                username = enterUsername.getText().toString();
                password = enterPassword.getText().toString();
                makeJsonArryReq(username, password);
                break;
        }

    }

}
