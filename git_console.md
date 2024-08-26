
# ** GIT   **__ GITHUB __** GIT **

PS D:\02_PYTHON>     cd 1.Proy_Discor
PS D:\1.Proy_Discor> git init #inicializa nuestro repositorio
PS D:\1.Proy_Discor> git add .     #Entramos a la area de preparacion
PS D:\1.Proy_Discor> git status    #Vemos el estado

# Vemos el estado   
    
PS D:\1.Proy_Discor> git commit -m"primer commit" # 2 archivos actuales por guardar

# Se guarda el archivo

# AHORA CREAMOMOS EL REPOSITORIO Y COPIAMOS EL CODIGO DEL REPOSITORIO (…or push an existing repository from the command line)
PS D:\1.Proy_Discor> git remote add origin https://github.com/CJose98/Proy_Discor.git
PS D:\1.Proy_Discor> git branch -M main
PS D:\1.Proy_Discor> git push -u origin main

# Se sube a la nube


# /////////////////////////////////////////////////////////////////////////////////////////////////////

PS D:\1.Proy_Discor>  clear # limpiar pantalla
PS D:\1.Proy_Discor> git branch # me permite ver en donde estoy parado (actualmente esto parado en main)
* main

PS D:\1.Proy_Discor> git branch developer   # creamos una rama nueva
PS D:\1.Proy_Discor> git checkout developer #  Ahora estamos parado en developer y no en main
Switched to branch 'developer'

PS D:\2- PROGRAMACION\TRABAJO PRACTICOS\02_PYTHON\1.Proy_Discor> git branch  #verificamos en donde estamos parado
* developer
  main

# AGREGAMOS MAS CODIGO A APP ( Ahora guardemos) (Ahora tenemos a MAIN Y A DEVELOPER)
PS D:\1.Proy_Discor> git add .
PS D:\1.Proy_Discor> git commit -m"primer commit" # cambiar nombre
PS D:\1.Proy_Discor> git switch main              # ?
PS D:\1.Proy_Discor> git switch developer         # ?

PS D:\1.Proy_Discor> git push                     # guardamos


# ///////////////////////////////////////////////////////////////////////////////////////////////////////////
# EJEMPLO.

# MODIFICAMOS A DEVELOPER y MAIN EN LA MISMA LINIA (TENEMOS MODIFICADO EN LOS DOS LADOS LINIA)

# ESTO NOS AYUDA AL MODIFICAR EN GRUPO EL CODIGO (TENEMOS QUE TENER CUIDADO)
# ENTONCES TENEMOS MAIN Y DEVELOPER EN LA LINIA 7 MODIFICADOS DE DIFERENTE FORMA

PS D:\1.Proy_Discor> git checkout developer
Switched to branch 'developer'
PS D:\1.Proy_Discor> git add .
PS D:\1.Proy_Discor> git status
PS D:\1.Proy_Discor> git commit -m"cambio mj"

PS D:\1.Proy_Discor> git checkout  main    
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
PS D:\1.Proy_Discor> git add .
PS D:\1.Proy_Discor> git commit -m"cambio mj"


# (CONFLICTO AHORA TENEMOS DOS COMMIT)
# " AHORA UNIMOS LOS DOS CODIGO DE DEVELOPER  A  MAIN "

PS D:\1.Proy_Discor> git merge developer
Auto-merging app.py
CONFLICT (content): Merge conflict in app.py
Auto-merging doc_git.txt
CONFLICT (content): Merge conflict in doc_git.txt
Automatic merge failed; fix conflicts and then commit the result.


# AHORA ELEGIMOS Q CODIGO QUEDA
"Aceptar cambio actual"
"Aceptar cambio entrante"
"Aceptar ambos cambios"
"Comparar cambios"

PS D:\1.Proy_Discor> git push -u developer # guardamos con este codigo
PS D:\1.Proy_Discor> git push              # o guardamos con esto


# ////////////////////////////////////////////////////////////////////////////



# ""%%% INVITAR A USUARIOA AMI REPOSITORIO    %%"""
# *ENTRAR A SETTING DEL REPOSITORIO 
# *ENTRAR A COLLABORATION
# *PONER LOS EMAILS O USUARIO DE INVITACION
# *LOS USUSARIO Q QUIERAN UNA VEZ UNIDO, CLONARAN EL REPOSITORIO DE CODE
# *LUEGO SE CREARAN UNA CARPETA Y LO PEGARAN EN FORMATO  ((( GIT BUSH HIRE )))
# *EL LA TEMINAL DE GIT CLONARAN EL REPOSITORIO
# *CODE : git clone URL(repositorio)


# //////////////////////////////////////////////////////////////////////////////////////////

# EJEMPLO CREANDO MAIN CON REPOSITORIA A GITHUB Y CREANDO UN USUARIA PARA CANVIAR LOS DATOS:

#                "" CREAMOS UN REPOSITORIO LOCAL APP "" 


PS D:\1.Proy_Discord\api> git init                              # INICIALIZAMOS INIT
PS D:\1.Proy_Discord\api> git branch                            # VEMOS EN DONDE ESTAMOS PARADO
PS D:\1.Proy_Discord\api> git add .                             # ENTRAMOS AL AREA DE PREPARACION
PS D:\1.Proy_Discord\api> git commit -m"primer commit"          # CREAMOS NUESTRO PRIMER COMMIT
PS D:\1.Proy_Discord\api> git remote add origin https://github.com/CJose98/app.git  # NOS UNIMOS AL REPOSITORIO
PS D:\1.Proy_Discord\api> git push -u origin main -f                                # AGREGAMOS NUESTRO REPOSITORIO LOCAL AL REPOSITORIO DE GITHUB



# ** """ VAMOS GUARDANDO CARPETAS NECESARIAS PARA LA ESTRUCTURA BACKEND - APP """ 

PS D:\1.Proy_Discord\api> git branch
* main
PS D:\1.Proy_Discord\api> git add .
PS D:\1.Proy_Discord\api> git status
PS D:\1.Proy_Discord\api> git commit -m"Guardamos la base" 
PS D:\1.Proy_Discord\api> git push -u origin main


#       *  FINALIAZDA LA ESTRUCTURA *                 
# "" CREAMOS AL USUARIO PARA QUE PUEDA MODIFICAR """

PS D:\1.Proy_Discord\api> git branch jose        #CREAMOS A USER  JOSE
PS D:\1.Proy_Discord\api> git checkout jose
PS D:\1.Proy_Discord\api> git checkout main
Switched to branch 'main'
PS D:\1.Proy_Discord\api> git checkout jose
Switched to branch 'jose'


# """ UNA VEZ PARADO EN EL USUARIO JOSE EMPEZAMOS A MODIFICAR """ ***********************************************************************************

PS D:1.Proy_Discord\api> git add .                                       # GUARDAMOS LO MODIFICADO
PS D:\1.Proy_Discord\api> git status                                     # ESTADO
PS D:\1.Proy_Discord\api> git commit -m"primera  modificacion de jose"   # CREAMOS NUESTRO PRIMER COMMIT
PS D:\1.Proy_Discord\api> git checkout main                              # AHORA NOS PARAMOS EN MAIN
Switched to branch 'main'
Your branch is up to date with 'origin/main'.

PS D:\1.Proy_Discord\api> git merge jose                                 # COMPARA LO MODIFICADO DE JOSE CON MAIN

# LE DAMOS OK. PARA QUE MODIFIQUE (ME LLEGARA UNA SOLICITUD AL REPOSITORIO GLOBAL QUE SI QUIERE ACEPATAR DICHO CAMBIO (EL USUARIO PRINCIPAL TIENE QUE DAR EL OK.)) /

PS D:\1.Proy_Discord\api> git push -u origin jose    

