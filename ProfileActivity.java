package com.example.sumon.androidvolley;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * The type Profile activity.
 */
public class ProfileActivity extends Activity implements OnClickListener {
    private Button btnBack;
    private Button btnLogout;
    private Button btnFriends;
    private Button btnAddFriend;
    private Button btnSetting;
    private Button btnPost;
    private Button btnFeed;
    private ImageView btnChangeImg;
    private TextView name;

    public static String getName = LoginRequestActivity.name;
    public static String getUsername = LoginRequestActivity.username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profile);

        btnBack = (Button) findViewById(R.id.btnBack);
        btnLogout = (Button) findViewById(R.id.btnLogout);
        btnFriends = (Button) findViewById(R.id.btnFriends);
        btnAddFriend = (Button) findViewById(R.id.btnAddFriend);
        btnSetting = (Button) findViewById(R.id.btnSetting);
        btnPost = (Button) findViewById(R.id.btnPost);
        btnFeed = (Button) findViewById(R.id.btnFeed);
        btnChangeImg = (ImageView) findViewById(R.id.ChangeImg);


        // button click listeners
        btnBack.setOnClickListener(this);
        btnLogout.setOnClickListener(this);
        btnFriends.setOnClickListener(this);
        btnAddFriend.setOnClickListener(this);
        btnSetting.setOnClickListener(this);
        btnPost.setOnClickListener(this);
        btnFeed.setOnClickListener(this);
        btnChangeImg.setOnClickListener(this);

        name = (TextView) findViewById(R.id.setName);
        name.setText(getName);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnLogout:
                startActivity(new Intent(ProfileActivity.this,
                        MainActivity.class));
                break;
            case R.id.btnBack:
                startActivity(new Intent(ProfileActivity.this,
                        LoginRequestActivity.class));
                break;
            case R.id.btnFriends:
                startActivity(new Intent(ProfileActivity.this,
                        FriendsListRequestActivity.class));
            case R.id.btnAddFriend:
                startActivity(new Intent(ProfileActivity.this,
                        AddFriendNonAdminActivity.class));
            default:
                break;
        }
    }

}
