<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit102d26a4a94b1bc1fea71a5fdd0ae142
{
    public static $prefixesPsr0 = array (
        'S' => 
        array (
            'Slim' => 
            array (
                0 => __DIR__ . '/..' . '/slim/slim',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixesPsr0 = ComposerStaticInit102d26a4a94b1bc1fea71a5fdd0ae142::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}