import React from "react";
import {Link} from 'react-router-dom';
import '../admin/admin.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminHead(){
  
    return (
        <>
 <body>
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"/>
 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <input type="checkbox" id="check" />
  <header>
    <label for="check">
      <i style={{left: "210px",marginTop: "11px"}} class="fas fa-bars" id="sidebar_btn"></i>
    </label>
    <div class="left_area">
      <h6>Course Enrollment</h6>
    </div>
    <div class="right_area">
      <Link to="/logout" className="logout_btn" style={{borderRadius:"0px"}}> Logout</Link>
    </div>
  </header>

  <div className="sidebar">
    <center>
      <img src="https://e7.pngegg.com/pngimages/9/763/png-clipart-computer-icons-login-user-system-administrator-admin-desktop-wallpaper-megaphone-thumbnail.png" class="profile_image" alt="" />
      <h4>Admin</h4>
    </center>
     <Link to="/AdminHome"><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></Link>
     <Link to="/viewInstructors"><i class="fas fa-chalkboard-teacher" style={{fontSize:"13px"}}></i><span>Instructors</span></Link>
     <Link to="/viewStudents"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8AAAD+/v77+/sEBAQwMDCmpqbv7++urq5ERET4+Pj19fXy8vLKysoaGhq9vb3n5+e0tLTk5OTY2NiOjo4SEhJ+fn52dnZhYWGfn59oaGjQ0NBVVVWoqKiWlpYnJyc2NjYgICDFxcU+Pj5CQkJaWlpvb2+GhoaRkZF6enpMTEwyMjJJ2dDQAAASiElEQVR4nO1dCX+yPAwvrYpyyKV4i7Ipm/v+3+9tkpZjc3tAh7j3x/855pCjadMkTdLAWI8ePXr06NGjR48ePXr06NGjR48ePXr06PG74Ixz/MHgA++6OS2Ac45E4l/+f6SQccGLT/9HCmHs/OA0PAW+Ytj/HYR3TgxAcvZE1425FzhCXAGP+N4SiBvIP4hl6qtzBP+7QypbLoQlf9rp+WAoDPSHw9m1BZwh/qrcka0WwIxWOpuXKSth+pYKkjt/kUTJfsxiphsPKyM3WUzy0YSDw3hjMov/1XkZzSaKlgGR+C7JMd2FppAOXmZR1w2tC1B4uXSxN9lcyRai5CVz8ST4L40PlVk5zSKb9ImAe4hnZVrZMsGEJZtnhbPLQJGHVCRnkJ1qugFLmimqDvwaz7zMQhBKcury56VQtk6AAN2MXqpyMw4cBvRZ1HLoB/nJCeKqfH1ZRerbZ52WXBJoRavXQbndw7XncCJP29uoA0G4CNNbD8s0Dl5XkYXd9KwwV+uqPrh4Ict1f95wII/DlJMHwuBSHcn1yuyShE/AZgtll4Q7JTlVW6frsVXrLvZ4PTf0pMR+2YVc9Qs9ozMAsyH3MeGMlwkOwwClizG/jEJRzxqTc1L4o8tcSya4S7IcO2gM4CO6nJbUwX6wVmymOO20Chl1QL17gOAJV6ecW/E268BkHQ8hw86VNvWx3P3z7coXxL+8nlDUKtTyV9u54gLUocelB/Z5p8qDe/GxIlqmq42FkoRVZMuP96BxwslsbVbTyv2S2Hs8fZwpP4TpnauSc7sPf+H+4dulqk7Pnkn88ij3Ds4abrmLlwp5L1nk/MZCD2yBKPt07wWutB5l7ICqTrNEdzL+d5i5XLfvTigd4c4O5XE0kswVZPC1D7HJhrloAbzGG4vWu78i9/QEttz4tSJdh9nmMRQuqpMvTlGo/5qXUJQMIDONqw9b3H37fwAsz7TgnfkkTvEo4zW1e+0HcdQRcMs0nszVUMrHpi0rSGDDUc6dRhIIRlwlftmNLajTsNtEkBg5iaO2TQDweZbn/zz2LFq2/voY0m0tL54X9BlG275WnCDjecWvlCw2ZguhCKDD3JwTo4xJ0La/HGWAM9EU6sXAJNu08LBNNqnoCyN2ncfYqSY+eHtRgly1INvYMH1IEIrGDdE+HhghgV4edXc16V+ytCVyroAoDMx0cdQ00kjOIlgPaju6GYW4rlfaxiIfHdJGFvhCaqQHLjKIwjEDw/R9UOZWY7IHdhVkQzYD1wvBzV57VGn4pDAzSYqz3zCZ6kBTiI4/x1sf1GQhIl/3NJJNG0Prp2hfmDGAA3p5yBJ+XNgxH0OaNXKBeCo3yjCWe7JymgAtmP1S34LudQpU+ObBrn9NoQJwlhgvy4aqFAw7dAzqCXml93MjT+mZaJcvJ4jpl2MdFH84PlGIso9vyp2P0uE0NnE6ftf5SBz524Q5Ph3LFwM2nHXlV/xCIfxzUShsK5PIWAfK0X2FRq5zFlg4Xpcli1REaMW47FnGkJrvAllHPxxtcy8EtHe6/C6mzemPHywrsbfpdhT6Rzjgsqs98wh8phAbksIIHE3JlNFqWBnJ4yJgV8YCBygglZpjuIokY5pHuFnaXVLKVwolPCTGoSaFb1vNdUTm2vNzU0Av/lTcu5BQ2zf08nDmINne4ynT+J7CxGbKZrOjtyI6A+1/ObsQvhDkHBW2ez4UX8L3b5GtYnPMTp6RwgAptLSTH1SIu9fBe6LimKXo7GBWmk316OHPwx4mHUb0wYqwkMKgC9oIVykc4zQSSn5wcplaUfZK7KrDiPHG38SJpg7pe83ACBK5yS77aHjlAY/EDxTqBBPta2EQyDcq4/WhB5V+jV2MNOXBY8RTUrhDbrsu/Ny46v3UeI1RI3w6W/6O3L1rqfk1cJXCEVJ4rb24WHfXJdbE0UvWrn/VmNYUjtqj4F+4SuGKKPyqorXlaauYNjFnFtgsjxB+uQApXLXV/n/jKoV7FPlfKRT58l2utAJ0uyRnjxQDE2pFXwVnyNT7Fkn4B36k8PPJnBcuXoxpZ0FYpLzxa6b1c1MoasfUroGksGCvT0vhwQEPhk4quQUYVA2Tp6XQSALO73AZCZyzAUnbZ6QQ2jWJrNvXPJawmK+i+c9JIa4R3sPb56HUq4k2f56NwhXZn9j7iw1ZYaJ2nohQdqyXFHd5Nn24MnQqDaRjvEe0wqiXbcLoTLHZKi830vhsNs0u73wagaWH+VB1xlBOPlg5etuSzfOEljeuD4ebdRFrSGaQM1oDmDG2f8npm3i4tni29aHyYnB3WBqH5Yg8uv+4IffK7pq9aeNvXa7xX79SCP7SgTEFR4t7MkoYvtG2gxKZ2lmDHGxFXn4+dEwmzw6n8HHTXSbUtTHkERybR2CxWS65mLT783CaeaatOTZvN7eccBdfjnrMQUKdIyA/Qn9p9FwUMh+b6FLuKKPoX4lK47iN92Mv3UQA1wvGb4tJKZAMH+cZRAIE+F7hd78T4hDXuJQ5hpo7kJwm1ZszJk/vp20WgzmgOFh8v105XHlIcU4bTjfUAVSEtHKM21N1kKuFH2PRaGj8hHKUIkZjT22fQbk8tTvhUlywYojCWFZEJLcw6L3/JDf9Xb4d6PNoFjjNKlkAgqz4yx0rlDuAA4QGGnp/y99gmuJ7ObWOY/K+v9kvk3lBz6BM6vEl9kKbVZLzuXiHr87dJAZjwOtArPUpc0B1fLmp5L6Aj6G3my0vpcyRebJdrALKF+PVgLEgdnh7ADnXAFmlqpGzKkeiw3RuV84t0ivAz2vZtuOHEr7p2DYxIbkyqr4MG0e8I6MNVEGg/Lmv5UR8juluhhFWzy7SwT4vM9S2w1IQOEeId+rIpIFGnbUIDEsrB87CI/X8vfKBEzdM/W4UPgTFhsUCrmyJkZMz+wUK0a96eFCy7BcoXTEgfVFuFzvD0e397RK4ijp3Ff+FHtbiPiltG5TNQT19vH8rYaTZvRt9yPgBRjCZfhIGUm5EOLT3Cwiy2aLOKKSskgBXPOtCkcnmOMhd23ui7yhb6TbOAxOEqk3AGJPh0NqhoAaivjM8Zt2TAyNtINsgiSW6ETXcwsE7gfbDRaruaSCVhveeCYT5uerOHXGpMJWeEMqs0e3ABuHkXFt3cKnsQipM0F2mCQpM6GGaLbbIx1B+mGH3h/cMojJoZl0VB+EMfWkHXMMNvki8aA4Hs9splBdm8IB5d9vX/Reg4V0KgQhZsuq1FSf49sO6eXcS59YQKNzW23vaBsi8xgUrpltuy5NFWZR3ODqV2fAL1u3NoPTyy+Wy3SYwXlO/YpuSo3N582ZzLlDOTO3uKJzmRqn64ZUpZDyjRcfN9w/xtlk3aaWwYPeLzQeKyKzKppsBzdPmopD2Fi5IGXY0hJL1zE8OpUF1oa9Nro+w7ibn8rXSKgrROXfpikehCe9GFfNKNFSeQGbzvrnCRpNhr4z3rkxS+OfFWYzIJOJZyHjFS8adizZYm48hZ3jtxezM6BZX5pZVPiRyV+O4+a4gNElhGq+euHoLA2bDqXowm3IaOPE+kEk7GsF6gKZR2smONSz1IMnaoZyedbYHoRZk//soD4dOU0nDbbrQb74r7HGg/RF7tcBqeu0KeXSvb/SUoLCTScHOhqEjbs9R13YlSBuAUzKtNGw+e+u/BZoHpGpHzzt+BYSDqdzzzdX82CuAiJ2g1djQeWZFoSBwCST5bYKJQDWuwM0LtLd43FQEdwFpftlLVIpjVjMnipS9JPBULwGnY8Dsi9A4Sfx6tXNA2eNqUy4qnraO2WfE2OCtovAfZEqqTrhQeX9E034JIcWJd7UkI3k/pKn3G+V7HgaPnAC1fGYq4tFlmldzCB6jsJn4NUbRnCCB8Z+ZgwDOzQRJPNU4eYnjnZh/Qdnn4BikAoEaf+exUYkKgmfEo25XIdHbAI1dkdtq/5PKEGRwDzBk/qcoxGX6mkhc/UCiQCNWUrj+a1XMQWhwZ6lG8bvRkebPipKklg4k/P0tCoGq8IN0RvzteRmx6DCk1P4HtvCXkCqn4zakulYFcKrmm0fSf9/qSRFo7/9LirVz893quKfZfdGxgQ6T1u8CODQocV+SscD8X0r1QtUeLYz8289Jm38FnOvadZgIt4gw6xergTjRu1GKECz+lBgtwK1tUQoJ1xozz7e45Xu65IIuk7T9U2I0T7rkkBkt2+8Fx3LxhHJcxzgGHpwytcsy6Nmht+MzrvL3PRZuDUXjQJGmSmFIGevpvPx8G3/XBPwbQBw42cLVBd2KUK0kvRhGUV1fTcBLCpVQsLzdheoOP6x8511A44uH3mVKpCToAeXeeqp1A22uWHvIzOC/oNrRQUSlebsm4J+AFrrvxT6EF9x9B5sTxsV2oeU4ooUF7ttWkzQ5e8/s0Kfd6JCcv5mVhMmAUvl0w+3ITV3a0kZHMWo8yBnXeIfCgdr+6ZCer1DCRZi7bUmkqIqjdAZVzGIq4V+3Py0UCl002UfwYgGqp/lEwLcd8PS9kCMSVGNHZ2xzpusniDxrk/u4Tc2oFrI5jcE2eDanhhDhqPK+lUsWOphVZKxVU3M9WeQdCswik4unML6UrjWm75sOc2quI8yOZW2+TmEYQhrQndqPQLOV5SRCUBRPAFVhp9U0iOVTuN6ocAfsUb4YhXFmrGk3iBAqgmFc379OiYgDWFpwypfVpb+U4hyFjCpndMevtGzluKNSk3fYhzY2ChdJC5Q6W/NrnA0ijVv8diGorhR0VzhSfUUvEto76A/pkEJoN+xuzqXLAnlLrXHlIDqk52dXGglp03DV1NGrKuLdzeyoLTv55d6CClmPJqxopGS0WIkXiKe9UdUgbBGHd+pwltLQplfGkMpmD6DynKUJRNvAHi8LGg8evverI3AWDHP+PASmKqSginsLC3Rahg09fG2kdcBvMggzqrQcka8v8ndCAV90s5tUwEj561zEL7/ztXBSA+dyhQWst3BGAi/fmS7mLNFOgHnA+ONfcgGcEw0NtQ56ce1vEtkE28xzgakmFJSeU2J2vrkuRmAkzfe5No9W1uMnI6cdhyjzsDT7N1U+uFCZC4YvirR3IXziwdE3cpLkZ3TWMmz9eANA57+AO9T8oeo8lFUn5/fSyt9oZcGmAzi2tr4J3KvCIcx7VdP8ZD7cxBnpKejyfFl/tamCm6ROVvnmDOgeHBvzWjYgniKUujHXilOXDxSoKCx1TaFzHUFHrgoI06uu2Bj1t4EFSt1ur1cGawNSfeWvgMjqecliPP1ikzoQ9oViorWexrwp2Thvj0vL1LstVDJwjQucD+oPMueUjvxw6ohH+QBXbQIPHpVtIwfhQtNoXM2g/eEKlwwDD7ekeaRi3HrXynGLaC5OwwepDJQTBnIZr0ehgD1RwGhTKCdkIdfh3qY6T+N6f6rUGe2PIamFiOZ+/Xe+wCtll0jWWY7hmUKGVhM/xZhMi4DlhW3aAogKi+zilwYv8YM6ScRpY5XNbYRNsvk5OgOkrDJrZpLdDBSFKir4jb31zWVo2gCfpujqB2OmgTeNC/OIwnvU+sZEaCp5OLMGgg1enCt4+RVmZ7meaGBMc73z0WD1i8DdBIEVgGAaQVpegzGEOaf8auR/Y1c3N3z7XM5syn0LWnaLA7ut9VKhaTa+KmyDll7TPHdLJei0vslbEhXhOMxv2BWDpg0uRuLmznv5sElu+jW8ttFzGHtDUbi7aXeaPcGLJ3ZTAxM9HJQNuGjbNrWwpsKLf8vuNCYoCzFqHIBBm9tGN1zSbio4ml+Qrcaap7+gyoBtUatbegesvTecw16rzkWuCifcnuvqB7fXYUO/gBG3K2ksLOA4uTmzoBSzaH6twADkod10d+rG1c2zXdxjVordnQxUB+hVGty+UfeedAvOqaBiu8Vp0fIa3tFKdrtZKVSlpvWN19eCidOwswpHtDnq0GbNyEhVR+ymKgcp/XarZtBW7bCbVFBaZBrtpjJi1YiJ2U1iD7wn6WLU9dHdCDR+zx1lZMND39FmbOn++Yb527Xh3W1Qm+Gbm3317s7IPY+FZn/99nVaICD9BlZQfmu5U3T/K0H5x0DoOlVfI8q/Ax1u6q4wBxU0MIoYz68DUwuGXaVIojX0QTVj2uBSQS6aB7z8+0dgfH/d0is7uYnp2afdqDvscAG1bSVcysulS7uEbMLQb4NLuUrS6phGev49Ve9+IFHVw+uYQvz/9he9/Eggd07/ePyjsGzFLQz+UXP7MeweH1u/ndgFxNXIc9kl0ONttRK8EIJbFpYr6Ra6Ia1wKeaBdp19LfJsoh49evTo0aNHjx49evTo0aNHjx49evTo0aOC/wDNcMXBb3GGWAAAAABJRU5ErkJggg==" style={{height:"20px",maxWidth:"100%",marginRight:"12px"}}></img><span>Students</span></Link>
    <Link to="/viewCoursesRequest"><i className="fas fa-book"></i><span>Manage Courses</span></Link>
    <Link to="/enrolls"><img src="https://qrirancode.ir/wp-content/uploads/enrollment-icon-png-5.png" style={{height:"20px",marginRight:"5px"}}></img><span>Enrolls</span></Link>

    
        
  </div>
  <div class="content">
    <br/><br/><br/><br/>

  </div>
</body>
</>
    )
}
export default AdminHead;

