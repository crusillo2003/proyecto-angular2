<?php
	require_once __DIR__ . '/vendor/autoload.php';
	use Psr\Http\Message\ServerRequestInterface;
	use Psr\Http\Message\ResponseInterface;
	
	use Slim\Http\Request;
	use Slim\Http\Response;
	use Slim\Http\UploadedFile;
	
	$app = new \Slim\Slim();
	
	$db = new mysqli("localhost", "root", "five022","webapp");
	
	$app->options("/restaurantes", function () use($db, $app){
		/*$app->response.header('Access-Control-Allow-Origin', '*');
		$app->response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
		$app->response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
	return $app->response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');*/
			return $app->response;
	});
	
	
	$app->post('/upload', function() use ($app) {
		
		//var_dump($_FILES);
		//$json =  json_decode($_FILES, true);
		
		//echo( $_FILES["uploads"]["name"][0]);
		
		//$user-This is a class that has pdo statements for interacting with the database
	   $var = $app->request->getBody();
	   $myvar1=json_decode($var,true);
	   
	   //print_r($_FILES['uploads']['name']);

	
	   $imgs=array();
	   //print_r ($_FILES['uploads']['error']);
	   //if($_FILES['uploads']['error']==0){
		   $name=uniqid('img-'.date('Ymd').'-');
		   //echo $name;
		   if(move_uploaded_file($_FILES['uploads']['tmp_name'][0],'C:/wamp/wamp64/www/proyecto-angular/slim/images/'.$_FILES['uploads']['name'][0])==true)
		   {
			   $old_neem=$_FILES['uploads']['name'];
			   //$imgs[]=array('url' => '/uploads/' . $name, 'name' =>$old_neem);
			  
		   }
	  // }
	   $result = array("status" => "success", "filename" => $_FILES['uploads']['name'][0]); 
	   echo json_encode($result);
});
	
	
	
	$app->options("/restaurantes/:id", function ($id) use($db, $app){
			return $app->response;
	});

	
	
	$app->get("/restaurantes", function() use($db, $app){
		$sql = "SELECT *FROM restaurantes ORDER BY id DESC";
		$query = $db->query($sql);
		$restaurantes = array();
		while($fila = $query -> fetch_assoc()){
			$restaurantes[]=$fila;
		}

		if($query){
			$result = array("status" => "success", "data" => $restaurantes);
		} else {
			$result = array("status" => "fail", "message" => "No se pudieron obtener los restaurantes.");
		}
		echo (json_encode($result));
		//echo (json_encode($restaurantes));
	});
	
	/**$app->get('/restaurantes', function() use($db, $app) {
    // Use the PSR 7 $request object

    $app->response->write('Bar');
	});*/
	

	$app->get("/restaurantes/:id", function($id) use($db, $app){
		$query = $db->query("SELECT *FROM restaurantes WHERE id = {$id}");	
		$productos = array();
		while($fila = $query -> fetch_assoc()){
			$productos[]=$fila;
		}
		
		echo json_encode($productos[0]);
	});
	
	
	$app->post("/restaurantes", function()  use($db, $app) {
		$list = $app -> request -> post();
		
		$jsonArray = json_decode($app -> request->getBody(), true);
		/*var_dump($jsonArray);
		echo $jsonArray['nombre'];
		foreach ($list as $value => $key) {			
			$list[1] = $value;
		}
		$obj = json_decode($list[1]);*/
			
		$query = "INSERT INTO restaurantes VALUES(NULL,"
					."'{$jsonArray['nombre']}',"
					."'{$jsonArray['direccion']}',"
					."'{$jsonArray['imagen']}',"
					."'{$jsonArray['descripcion']}',"
					."'{$jsonArray['precio']}'"
		.")";
		
		$insert = $db -> query($query);
		if($insert){
			$result = array("status" => "success", "message" => $query);
		} else{
			$result = array("status" => "false", "message" => "No se pudo crear el restaurant");
		}
		echo json_encode ($result);
	});
	
	$app->put("/restaurantes", function() use ($db, $app) {
		$body = $app -> request();
				
		$restaurante = json_decode($body->getBody());
		
		$query = "UPDATE restaurantes SET nombre='{$restaurante->nombre}',descripcion='{$restaurante->descripcion}', direccion='{$restaurante->direccion}', precio='{$restaurante->precio}', imagen='{$restaurante->imagen}'  WHERE id={$restaurante->id}";
		
		$insert = $db -> query($query);
		if($insert){
			$result = array("status" => "success", "message" => "Actualizacion exitosa");
		} else{
			$result = array("status" => "false", "message" => "No se pudo crear el restaurant => ".$query);
		}
		echo json_encode ($result);
    /*try {
		$stmt = $db->prepare($sql);
        $stmt->bindParam("name", $restaurante->nombre);
        $stmt->bindParam("description", $restaurante->descripcion);
        $stmt->bindParam("adress", $restaurante->direccion);
        $stmt->bindParam("price", $restaurante->precio);
		$stmt->bindParam("id", $restaurante->id);
        $stmt->execute();
		echo json_encode($restaurante);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
		/*$list = $app -> request -> put();
		foreach ($list as $value => $key) {			
			$list[1] = $value;
		}
		print_r ($app -> request -> post());
		//$obj = json_decode($list);
		
		$query = "UPDATE restaurantes SET "
					."nombre = '{$obj->nombre}',"
					."descripcion = '{$obj->descripcion}',"
					."direccion = '{$obj->direccion}',"
					."precio = '{$obj->precio}'"
					." WHERE id = '{$obj->id}'";
					
		$update = $db -> query($query);
		if($update){
			$result = array("STATUS" => "true", "message" => "Producto actualizado correctamente");
		} else{
			$result = array("STATUS" => "false", "message" => "El producto no se ha podido actualizar: {$query}");
		}
		
		echo json_encode($result);*/
	});
	
	$app->delete("/restaurantes/:id", function($id) use ($db, $app) {
		
		$query = "DELETE FROM restaurantes WHERE id = {$id}";
					
		$delete = $db -> query($query);
		if($delete){
			$result = array("STATUS" => "success", "message" => "Restautante eliminado correctamente");
		} else{
			$result = array("STATUS" => "false", "message" => "El restaurante no se ha podido barrar");
		}
		
		echo json_encode($result);
	});
	
	$app->run();