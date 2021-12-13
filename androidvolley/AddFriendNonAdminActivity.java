package com.example.sumon.androidvolley;

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

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.example.sumon.androidvolley.Admin.AdminActivity;
import com.example.sumon.androidvolley.app.AppController;
import com.example.sumon.androidvolley.utils.Const;

import org.json.JSONObject;

/**
 * The type Create account activity.
 */
public class AddFriendNonAdminActivity extends Activity implements OnClickListener {
    private String TAG = AddFriendNonAdminActivity.class.getSimpleName();
    private Button btnAdd, btnRmv;
    private ProgressDialog pDialog;

    private String username = "filler123", username2 = "filler124";
    private EditText editUserTwo;
    private TextView userOne;

    private String tag_json_obj = "jobj_req";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.addfriendnonadmin);

        btnAdd = (Button) findViewById(R.id.btnAdd_Friend);
        btnRmv = (Button) findViewById(R.id.btnRemoveFriend);

        pDialog = new ProgressDialog(this);
        pDialog.setMessage("Loading...");
        pDialog.setCancelable(false);

        btnAdd.setOnClickListener(this);
        btnRmv.setOnClickListener(this);
        username = ProfileActivity.getUsername;

        userOne = (TextView) findViewById(R.id.viewThisUser);
        editUserTwo = (EditText) findViewById(R.id.editUserTwo);
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
     * Making json object request in order to create a account and add to backend
     * */
    private void makeJsonObjReq() {
        String urlUsername = Const.URL_ADDFRIEND+ "userOne=" + username + "&userTwo=" + username2;

        showProgressDialog();
        JsonObjectRequest jsonObjReq = new JsonObjectRequest(Request.Method.POST,
                urlUsername , null,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d(TAG, response.toString());
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
        AppController.getInstance().addToRequestQueue(jsonObjReq,
                tag_json_obj);
    }

    private void makeJsonObjReqRmv() {
        String urlUsername = Const.URL_RMVFRIEND+ "UserOne=" + username + "&UserTwo=" + username2;

        showProgressDialog();
        JsonObjectRequest jsonObjReq = new JsonObjectRequest(Request.Method.DELETE,
                urlUsername , null,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d(TAG, response.toString());
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
        AppController.getInstance().addToRequestQueue(jsonObjReq,
                tag_json_obj);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnAdd_Friend:

                userOne.setText(username);
                username2 = editUserTwo.getText().toString();

                makeJsonObjReq();
                startActivity(new Intent(AddFriendNonAdminActivity.this,
                        AdminActivity.class));
                break;
            case R.id.btnRemoveFriend:

                userOne.setText(username);
                username2 = editUserTwo.getText().toString();

                makeJsonObjReqRmv();
                startActivity(new Intent(AddFriendNonAdminActivity.this,
                        AdminActivity.class));
                break;
        }

    }
}
